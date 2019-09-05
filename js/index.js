$(function(){
	var blogid = getCookie("blogid");
	var post_data = (blogid == null ? {"offset":0,"rows":10} : {"offset":0,"rows":10,"blogid":blogid});
	$(".load-more").click(function () {
		loadMore();
	});
	$.ajax({url: siteURL + "/articleInfo/index",
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
					temp.children("a").attr("href", "blog-inner.html?id=" + temp_data.article_id);
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
			},
			error: function(e){
				alert("fail");
			}
		});
});

function loadMore() {
	var offset = $(".load-more").attr("offset");
	$.ajax({url: siteURL + "/articleInfo/index",
			async: false,
			type: "POST",
			data: {"offset":offset,"rows":10},
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
				$ (".button-sec").attr("offset", parseInt(offset) + data.length + '');
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
	'<a href="blog-inner.html?id=' + article.article_id + '" class="continue-read">Continue Reading</a>' + 
	'</div>' + 
	'</div>';
    $ (".button-sec").prepend(textToPrepend);
}
