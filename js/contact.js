$(function() {
	$(".submit-btn").click(function(){
		contact();
	});
});

function contact() {
	$.ajax({
		type:"POST",
		url:siteURL+"/contact/sendMail",
		async:false,
		data:$("form").serialize(),
		success:function(data){
			alert(data);
		}
	});
}
