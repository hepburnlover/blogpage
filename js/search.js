var url = window.location.href;
var URL_decode = decodeURI(decodeURI(url));
var para = GetQueryString_new("para");
var offset = GetQueryString_new("offset");
var rows = GetQueryString_new("rows");
$(function(){
	var post_data = {"offset":offset,"rows":rows,"para":para};
	$(".load-more").click(function () {
		loadMore();
	});
	$(".fa-search").click(function () {
		search();
	});
	$.ajax({url: siteURL + "/articleInfo/search",
			async: false,
			type: "POST",
			data: post_data,
			dataType: "json",
			success: function(data){
				var postDivs = $(".big-post");
				var index = 0;
				postDivs.each(function() {
					var temp_data = data[index];
					index++;
					if (temp_data == null) {
						return;
					}
					var temp = $(this);
					temp.children("h2").html(temp_data.title);
					temp.children("h5").html(temp_data.description);
					temp.children("a").attr("href", "blog-inner.html?id=" + temp_data.id);
					var ad = temp.find("ol li .admin");
					ad.html(temp_data.username);
					var catalogDiv = temp.find("ol li").eq(2);
					var catalogs = temp_data.catalog.split(",");
					var catalogDivHtml = 'In ';
					catalogs.forEach(function(catalog) {
						var kind = '';
						if (catalog == '1') {
							kind = '后台';
						} else if (catalog == '2') {
							kind = '前端';
						} else if (catalog == '3') {
							kind = '哲学';
						} else if (catalog == '4') {
							kind = '瞎写';
						} else {
							return;
						}
						catalogDivHtml = catalogDivHtml + '<a href="#" class="fashion" style="margin-left:2px;">'+kind+'</a>';
					});
					catalogDiv.html(catalogDivHtml);
					temp.show();
				});
				offset = parseInt(offset) + data.length;
			},
			error: function(e){
				alert("fail");
			}
		});
});

function loadMore() {
	$.ajax({url: siteURL + "/articleInfo/search",
			async: false,
			type: "POST",
			data: {"offset":offset,"rows":rows,"para":para},
			dataType: "json",
			success: function(data){
				if (data.length == 0) {
					alert ("there is no more");
					return;
				}
				for (var i = 0; i < data.length; i++) {
					var article = data[i];
					writePostDiv(article);
				}
				offset = offset + data.length;
			},
			error: function(e){
				alert("load fail");
			}
		});
}

function writePostDiv(article) {
	var catalogs = article.catalog.split(",");
	var catalogDivHtml = 'In ';
	catalogs.forEach(function(catalog) {
		var kind = '';
		if (catalog == '1') {
			kind = '后台';
		} else if (catalog == '2') {
			kind = '前端';
		} else if (catalog == '3') {
			kind = '哲学';
		} else if (catalog == '4') {
			kind = '瞎写';
		} else {
			return;
		}
		catalogDivHtml = catalogDivHtml + '<a href="#" class="fashion" style="margin-left:2px;">'+kind+'</a>';
	});
	var textToPrepend = '<div class="col-md-12">' +
	'<div class="post-item big-post">' +
	'<h2>'+ article.title +'</h2>' +
	'<ol class="breadcrumb">' +
	'<li class="breadcrumb-item">November 20, 2014</li>' +
	'<li class="breadcrumb-item"> By <a href="#" class="admin">' + article.username + '</a></li>' +
	'<li class="breadcrumb-item">' + catalogDivHtml +
	'</li>' +
	'<li class="breadcrumb-item">(23) Comments</li>' + 
	'</ol>' + 
	'<h5>' + article.description + '</h5>' + 
	'<a href="blog-inner.html?id=' + article.id + '" class="continue-read">Continue Reading</a>' + 
	'</div>' + 
	'</div>';
    $ (".button-sec").prepend(textToPrepend);
}

function search() {
	var para = $(".search-box:first").val();
	$(location).attr('href', 'search.html?para=' + para + "&offset=0&rows=10");
}

//自定义获取URL中某一参数的封装函数
    function GetQueryString_new(name){
         var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
         var r = URL_decode.substr(URL_decode.indexOf("?")).substr(1).match(reg);//注意这里使用的是解码之后的URL_decode
         if(r!=null){
             return  unescape(r[2]);//2017年12月11日--注意：这里有个解密的操作。
         }else{
             return null;
         }
    }