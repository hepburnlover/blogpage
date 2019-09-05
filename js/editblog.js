var ue = UE.getEditor('container');
ue.ready(function() {
	
});

$(function() {
	//validLogin();
	$(".more-btn").click(function() {
		submit();
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

