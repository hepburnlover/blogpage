var ue = UE.getEditor('container');
ue.ready(function() {
	
});

$(function() {
	validLogin();
	$(".more-btn").click(function() {
		submit();
	});
});

function submit() {
	var user_cache_id = getCookie("user_cache_id");
	if (user_cache_id == null || user_cache_id.length < 1) {
		alert("please login");
		return;
	}
	$("#user_cache_id").attr("value", user_cache_id);
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

