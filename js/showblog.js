$(function(){
	var id = getQueryString("id")
	$.ajax({
		type:"post",
		url:siteURL+"/articleInfo/showblog",
		async:true,
		data:{"id":id},
		dataType:"json",
		success:function(data){
			$($(".big-post").children("h1").get(0)).html(data.title);
			$("#create-time").html(data.time);
			$("#admin").html(data.admin);
			$("#catalog").html(data.catalog);
			$("#comments").html(data.comments);
			$("#content").html(data.content);
			uParse('#content', {
		    	rootPath: 'http://localhost:8080/uploadServer/'
			});
		}
	});
});

function getQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}