
var indexPage = {
    init: function () {
        this.modifyPassword();
        this.loginOut();
        this.getPageData();
        this.updatePwd();  //用户修改密码
        //$("#userName").html(Ter.userInfo.uname);//登录用户
    },
    modifyPassword: function () {
        $("#modifyPassword").on('click', function () {
            $("#password").modal("show");          
        });
    },
    updatePwd: function () {
        $("#saveBtn").on('click', function (e) {
            var nowPwd = $.trim($("#nowPassword").val());
            var newPwd = $.trim($("#newPassword").val());
            var senewPwd = $.trim($("#reNewPassword").val());

            if (newPwd.length < 3 || senewPwd.leng < 3) {
                layer.alert("密码为3位及以上的数字或字母!", {
                    title: '提示'
                });
                return;
            }
            if (newPwd != senewPwd) {
                layer.alert("两次密码必须一致!", {
                    title: '提示'
                });
                return;
            }
            Ter.getApi({
                apiname: 'main/SysUser/UpdatePwd',
                params: { UserName: '', OldPwd: nowPwd, NewPwd: newPwd }
            }, function (res) {
                res = res.Result;
                if (res.Rows == "1") {
                    layer.alert("密码修改成功!", {
                        title: '提示'
                    });
                    $("#password").modal("hide");
                }
                else {
                    layer.alert("当前密码错误，请重新输入!", {
                        title: '提示'
                    });
                }
            })
        });
    },
    loginOut: function () {
        $("#loginout").click(function () {
          /*  Ter.getApi({
                apiname: 'main/SysUser/CheckOut',
                params: {

                }
            }, function (res) {
                if (res.Result.Rows == 1) {
                    localStorage.removeItem('userInfo');

                }
            })*/
          location.href = 'login.html';
        })
    },
    getPageData: function () {
        $(".sidebar-navList").prepend(template('sideMenu', Ter.userInfo.power));
    }
};
$(function () {
        indexPage.init();
});