$('.navbar-toggler').click(function() {
    $('.navbar-collapse').slideToggle();
   });
   
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
	return unescape(arr[2]);
	else
	return null;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
} 

function validLogin() {
	var blogid = getCookie("blogid");
	if (blogid == null || blogid.length < 1) {
		alert("please login");
		$(location).attr('href', 'comein.html');
	}
}



