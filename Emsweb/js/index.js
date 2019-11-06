var indexPage = {
	init: function() {
		this.modifyPassword();
		this.loginOut();
		this.getPageData(); //加载菜单
		this.updatePwd(); //用户修改密码
		//		$("#userName").html(Ter.userInfo.uname);//登录用户
	},
	modifyPassword: function() {
		$("#modifyPassword").on('click', function() {
			$("#password").modal("show");
		});
	},
	updatePwd: function() {
		$("#saveBtn").on('click', function(e) {
			var nowPwd = $.trim($("#nowPassword").val());
			var newPwd = $.trim($("#newPassword").val());
			var senewPwd = $.trim($("#reNewPassword").val());

			if(newPwd.length < 3 || senewPwd.leng < 3) {
				layer.alert("密码为3位及以上的数字或字母!", {
					title: '提示'
				});
				return;
			}
			if(newPwd != senewPwd) {
				layer.alert("两次密码必须一致!", {
					title: '提示'
				});
				return;
			}
			Ter.getApi({
				apiname: '/user/updatePwd',
				params: {
					id: Ter.userInfo.id,
					oldPwd: nowPwd,
					newPwd: newPwd
				}
			}, function(res) {
				if(res.errCode == "SUCCESS") {
					layer.alert("密码修改成功!", {
						title: '提示'
					});
					$("#password").modal("hide");
				} else {
					layer.alert("当前密码错误，请重新输入!", {
						title: '提示'
					});
				}
			})
		});
	},
	loginOut: function() {
		$("#loginout").click(function() {
			Ter.getApi({
				apiname: '/user/checkOut',
			}, function(res) {
				if(res.errCode == "SUCCESS") {
					localStorage.removeItem('userInfo');
				}
				location.href = 'login.html';
			})
		})
	},
	getPageData: function() {
		//				$(".sidebar-navList").prepend(template('sideMenu', Ter.userInfo.power));
		console.log(Ter.userInfo.roleId);
		Ter.getApi({
			apiname: '/roles/findMenuByRoleId',
			params: {
				"id": Ter.userInfo.roleId
			}
		}, function(res) {
			console.log(res);
			var html = `<div class="sidebar-navItem">`;
			for(var item1 of res.result) {
				html += `<div class="sidebar-title">
                        <span class="title-icon"></span>
                        <span class="title-name">${item1.menuname}</span>
                    </div>`;
				if(item1.childMenus.length === 0) break;
				html += `<ul class="sidebar-trans-list">`;
				for(var item2 of item1.childMenus) {
					console.log(item2);
					html += `<li class="sidebar-trans-item" id="4" data-url=${item2.munuurl}>
                <a href="javascript:;">
                    <div class="trans-icon">
                        <i class="fa fa-address-book"></i>
                    </div>
                    <div class="trans-name">${item2.menuname}</div>
                </a>
            </li>`
				}
				html += `</ul>`;
			}
			html += `</div>`;
			$("#sideMenu").append(html);
		})
	}
};
$(function() {
	indexPage.init();
});