$(function(){
	var type = getQueryString("type");
	if (type == "registe") {
		$(".submit-btn").val("Rua");
		$(".submit-btn").click(function(){
			registe();
		});
	} else {
		$(".submit-btn").val("Login");
		$(".submit-btn").click(function(){
			login();
		});
	}
});

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

function registe() {
	if (!validata()) return;
	$.ajax({
		type:"POST",
		url:siteURL+"/entry/registe",
		async:true,
		data:$("form").serialize(),
		success:function(data){
			var result = JSON.parse(data);
			if (result.status == "S") {
				setCookie("user_cache_id", result.uuid, -1);
				setCookie("user_cache_id", result.uuid, 1);
				setCookie("username", result.username, -1);
				setCookie("username", result.username, 1);
				alert("success");
				$(location).attr('href', 'index.html');
			} else {
				alert(result.msg);
			}
		}
	});
}

function login() {
	if (!validata()) return;
	$.ajax({
		type:"POST",
		url:siteURL+"/entry/login",
		async:true,
		data:$("form").serialize(),
		success:function(data){
			var result = JSON.parse(data);
			if (result.status == "S") {
				setCookie("user_cache_id", result.uuid, -1);
				setCookie("user_cache_id", result.uuid, 1);
				setCookie("username", result.username, -1);
				setCookie("username", result.username, 1);
				$(location).attr('href', 'index.html');
			} else {
				alert(result.msg);
			}
		}
	});
}

function validata() {
	if ($("form :text").val().length == 0 || $("form :password").val().length == 0) {
		return false;
	}
	return true;
}

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