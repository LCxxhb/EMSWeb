var login = {
	init: function() {
		login.Login();
	},
	Login: function() {
		$('#formlogin input').bind('keyup', function(event) {
			if(event.keyCode == "13") {
				//回车执行查询
				$('#btnLogin').click();
			}
		});
		$("#btnLogin").click(function() {
			if(Ter.checkForm("formlogin")) {
				var username = $("#UserName").val();
				var pwd = $("#Password").val();
				Ter.getApi({
					apiname: '/user/login',
					params: {
						username: username,
						password: pwd,
						KeyFrom: 'web'
					}
				}, function(res) {
					if(res.errCode != 'SUCCESS') {
						message = '用户名或密码不正确！';
						layer.alert(message, {
							title: '提示'
						});
					} else {
						console.log(res.result);
						localStorage.setItem('userInfo', JSON.stringify(res.result));
						location.href = 'index.html';
					}
				});
			}
		})
	}
}
$(function() {
	login.init();
});