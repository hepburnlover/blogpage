function getQueryString(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
var ue = UE.getEditor('container');
ue.ready(function() {
	
});

$(function() {
	validLogin();
	$(".more-btn").click(function() {
		submit();
	});
	var id = getQueryString("id")
	$.ajax({
		type:"post",
		url:siteURL+"/articleInfo/showblog",
		async:true,
		data:{"id":id},
		dataType:"json",
		success:function(data){
            UE.getEditor('container').setContent(data.content);
            $("#title").attr("value", data.title);
            $("#description").attr("value", data.description);
            if (data.catalog.indexOf('1') != -1) {
            	$("#catalog1").attr("checked", true);
            } 
            if (data.catalog.indexOf('2') != -1) {
            	$("#catalog2").attr("checked", true);
            } 
            if (data.catalog.indexOf('3') != -1) {
            	$("#catalog3").attr("checked", true);
            } 
            if (data.catalog.indexOf('4') != -1) {
            	$("#catalog4").attr("checked", true);
            }
		}
	});
});

function submit() {
	var blogid = getCookie("blogid");
	if (blogid == null || blogid.length < 1) {
		alert("please login");
		return;
	}
	$("#blogid").attr("value", blogid);
	var mydata = $("form").serialize();
	$.ajax({
		type:"POST",
		url:siteURL+"/articleInfo/editblog",
		async:false,
		data:mydata,
		success:function(data){
			alert(data.status);
			if (data.status == "success") {
				window.location.href="blog-inner.html?id="+data.id;
			}
		},
		fail: function(e) {
			alert("请求失败");
		}
	});
}

