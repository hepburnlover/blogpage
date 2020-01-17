(function(){
	validLogin();
	var username = getCookie("username");
	var ws = new WebSocket('ws://68.168.128.171:8081/webSocketBySpring/customWebSocketHandler?username=' + username);
	ws.onopen = function(evt) { 
	  console.log("Connection open ...");
	};
	
	ws.onclose = function(evt) {
	  console.log("Connection closed.");
	};
	
	window.onbeforeunload = function () {  
	    ws.close();  
	} 
  
  var searchFilter = {
    options: { valueNames: ['name'] },
    init: function() {
      var userList = new List('people-list', this.options);
      var noItems = $('<li id="no-items-found">No items found</li>');
      
      userList.on('updated', function(list) {
        if (list.matchingItems.length === 0) {
          $(list.list).append(noItems);
        } else {
          noItems.detach();
        }
      });
    }
  };
  
  searchFilter.init();
  
  var chat = {
  	ws: ws,
  	senderName: '',
  	username: username,
    messageToSend: '',
    messageResponses: '',
    searchFilter: searchFilter,
    init: function() {
      this.cacheDOM();
      this.bindEvents();
      this.render();
    },
    cacheDOM: function() {
      this.$chatHistory = $('.chat-history');
      this.$peopleList = $('.people-list').find('ul');
      this.$button = $('button');
      this.$textarea = $('#message-to-send');
      this.$chatHistoryList =  this.$chatHistory.find('ul');
    },
    bindEvents: function() {
    	var _this = this;
      this.$button.on('click', this.addMessage.bind(this));
      this.$textarea.on('keyup', this.addMessageEnter.bind(this));
      this.ws.onmessage = function(evt) {
      	console.log( "Received Message: " + evt.data);
      	var data = JSON.parse(evt.data);
      	var msgType = data.msg_type;
      	if (msgType == 'I') { // init
      		var users = data.users;
      		var peopleListTemplate = Handlebars.compile( $("#people-template").html());
      		for (var i = 0; i < users.length; i++) {
		        var context = { 
		          id: users[i],
		          picture: "t4",
		          name: users[i]
		        };
		        _this.$peopleList.append(peopleListTemplate(context));
      		}
      	} else if (msgType == 'A') { // connected
      		var peopleListTemplate = Handlebars.compile( $("#people-template").html());
	        var context = { 
	          id: data.username,
	          picture: "t4",
	          name: data.username
	        };
	        _this.$peopleList.append(peopleListTemplate(context));
      	} else if (msgType == 'B') { // disconnected
	        _this.$peopleList.find('#' + data.username).remove();
      	} else {
      		_this.messageResponses = data.msg;
				  _this.senderName = data.username;
				  _this.renderResponse();
      	}
      	_this.searchFilter.init();
			};
    },
    render: function() {
      this.scrollToBottom();
      if (this.messageToSend.trim() !== '') {
        var template = Handlebars.compile( $("#message-template").html());
        var context = { 
          messageOutput: this.messageToSend,
          time: this.getCurrentTime(),
          name: this.username
        };
        this.sendMsg(this.messageToSend);
        this.$chatHistoryList.append(template(context));
        this.scrollToBottom();
        this.$textarea.val('');
        
      }
      
    },
    
    renderResponse: function() {
    	// responses
        var templateResponse = Handlebars.compile( $("#message-response-template").html());
        var contextResponse = { 
          response: this.messageResponses,
          time: this.getCurrentTime(),
          name: this.senderName
        };
	      this.$chatHistoryList.append(templateResponse(contextResponse));
	      this.scrollToBottom();
    },
    
    addMessage: function() {
      this.messageToSend = this.$textarea.val()
      this.render();         
    },
    addMessageEnter: function(event) {
        // enter was pressed
        if (event.keyCode === 13) {
          this.addMessage();
        }
    },
    scrollToBottom: function() {
       this.$chatHistory.scrollTop(this.$chatHistory[0].scrollHeight);
    },
    getCurrentTime: function() {
      return new Date().toLocaleTimeString().
              replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
    },
    sendMsg: function(msg) {
			if (msg) {
				var sendData = {username:this.username, msg:msg};
				this.ws.send(JSON.stringify(sendData));
			}
		}
    
  };
  
  chat.init();
  
})();