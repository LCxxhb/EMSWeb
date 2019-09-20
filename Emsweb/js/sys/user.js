var userPage = {
    init: function () {
        login.Login();
    },
    Login: function () {
        $('#formlogin input').bind('keyup', function (event) {
            if (event.keyCode == "13") {
                //回车执行查询
                $('#btnLogin').click();
            }
        });
        $("#btnLogin").click(function () {
            if (Ter.checkForm("formlogin")) {
                var username = $("#UserName").val();
                var pwd = $("#Password").val();
                Ter.getApi({
                    apiname: 'main/SysUser/CheckLogin',
                    params: {
                        UserName: username,
                        UserPwd: pwd,
                        KeyFrom: 'web'
                    }
                }, function (res) {
                    res = res.Result;
                    var message = '登陆成功';
                    if (res.state != '正常') {
                        message = res.state == '' ? '用户名或密码不对' : '账户被锁定';
                        layer.alert(message, {
                            title: '提示'
                        });
                    }                   
                    if (message.indexOf('成功') > -1) {
                        localStorage.setItem('userInfo', JSON.stringify(res));
                        location.href = '/index.aspx';
                    }
                });
            }
        })
    }
}
$(function () {
    userPage.init();
});