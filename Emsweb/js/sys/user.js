var userpage = {
	init: function() {
		userpage.loadTable(); //加载table
		userpage.loadSlect(); //加载下拉框
	},
	loadTable: function() {
		$('#mytable').bootstrapTable({
			pagination: true, //是否显示分页（*）
			striped: true, //隔行变色
			columns: [{
				checkbox: true,
				visible: true
			}, {
				field: 'ID',
				title: 'ID',
			}, {
				field: 'USERNAME',
				title: '用户名称'
			}, {
				field: 'ROLE_ID',
				title: '角色ID',
			}, {
				field: 'ROLENAME',
				title: '角色名称',
			}, {
				field: 'AREA_ID',
				title: '所属区域ID',

			}, {
				field: 'ANAME',
				title: '所属区域',

			}, {
				field: 'STATUS',
				title: '状态',
				formatter: function(value, row, index) {
					//通过formatter可以自定义列显示的内容
					//value：当前field的值，即id
					//row：当前行的数据
					if(0 == value) {
						return "禁用";
					} else if(1 == value) {
						return "启用";
					}
				},
			}, {
				field: 'cz',
				title: '操作',
				formatter: userpage.action,
				align: 'center'
			}]
		});
		this.loadTableData();
	},

	//操作方法
	action: function(value, row, index) {
		var col = '<a class="ter-visibleBtn" data-power="密码重置" onclick=userpage.permission("' + row.ID + '")>密码重置</ a>';
		return col;
	},
	//密碼重置
	permission: function(id) {
		layer.confirm("确认要密码重置？", {
				btn: ['确定', '取消'],
				title: "提示"
			},
			function() {
				var params = {
					"id": id
				};
				Ter.getApi({
						apiname: '/user/resetPassword',
						params: params
					},
					function(res) {
						if(res) {
							layer.alert(res.errMsg);
						}
					})
			})
	},
	//加载搜索条件角色下拉框
	loadSlect: function() {
		Ter.getApi({
				apiname: '/roles/findAll',
			},
			function(res) {
				if(res.result) {
					var select = $("#usertype");
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].id + "'>" +
							res.result[i].rolename + "</option>");
					}
				}
			})
	},
	//加载角色模态框下拉框
	LoadModalRoleSelect: function(id) {
		$("#role_id").empty();
		Ter.getApi({
				apiname: "/roles/findAll"
			},
			function(res) {
				if(res.result) {
					var select = $("#role_id");
					for(var i = 0; i < res.result.length; i++) {
						if(id == res.result[i].id) {
							select.append("<option value='" + res.result[i].id + "' selected='selected'>" +
								res.result[i].rolename + "</option>");
						} else {
							select.append("<option value='" + res.result[i].id + "'>" +
								res.result[i].rolename + "</option>");
						}
					}
				}
			})
	},
	//加载区域模态框下拉框
	LoadModalAreaSelect: function(id) {
		$("#area_id").empty();
		Ter.getApi({
				apiname: "/region/findAllRegion"
			},
			function(res) {
				if(res.result) {
					var select = $("#area_id");
					for(var i = 0; i < res.result.length; i++) {
						if(id == res.result[i].aid) {
							select.append("<option value='" + res.result[i].aid + "' selected='selected'>" +
								res.result[i].aname + "</option>");
						} else {
							select.append("<option value='" + res.result[i].aid + "'>" +
								res.result[i].aname + "</option>");
						}
					}
				}
			})
	},
	//查询按钮事件绑定
	btnSearch: function() {
		this.loadTableData();
	},
	//加载table数据
	loadTableData: function() {
		var role_id = $.trim($('#usertype option:selected').val());
		var username = $.trim($('#name').val());
		var params = {
			"roleId": role_id,
			"username": username,
		};
		var url = '/user/findAll';
		Ter.getApi({
				apiname: url,
				params: params
			},
			function(res) {
				if(res) {
					//加载表格
					$("#mytable").bootstrapTable('load', res.result);
					$("#mytable").bootstrapTable('refresh', res.result);
				}
			})
	},
	//用户添加、编辑
	btnEdit: function(parm) {
		if(parm == 0) {
			$("#myModal").modal("show");
			$('#title').html('新增用户');
			$('#id').val('');
			$('#username').val('');
			this.LoadModalRoleSelect("");
			this.LoadModalAreaSelect("");
		} else {
			var rows = $('#mytable').bootstrapTable('getSelections');
			if(rows.length != 1) {
				layer.alert("请选择一条数据进行编辑！")
				return;
			}
			//会显选中的用户信息
			$("#myModal").modal("show");
			$('#title').html('编辑用户');
			$('#id').val(rows[0].ID);
			$('#username').val(rows[0].USERNAME);
			this.LoadModalRoleSelect(rows[0].ROLE_ID);
			this.LoadModalAreaSelect(rows[0].AREA_ID);
		}

	},
	//添加编辑数据方法 提交表单
	btnOk: function() {
		var role_id = $.trim($('#role_id option:selected').val());
		var area_id = $.trim($('#area_id option:selected').val());
		var username = $.trim($('#username').val());
		var id = $('#id').val();
		var url;
		if(id == null || id == undefined || id == "") { //用户添加
			url = '/user/insert';
			var user = {
				"username": username,
				"areaId": area_id,
				"roleId": role_id,
				"password": '000000'
			}
		} else {
			url = '/user/update';
			var user = {
				"id": id,
				"username": username,
				"areaId": area_id,
				"roleId": role_id,
				"password": '000000'
			}
		}
		Ter.getApi({
				apiname: url,
				params: user
			},
			function(res) {
				if(res.errCode == "SUCCESS") {
					layer.alert(res.errMsg);
					$('#myModal').modal('hide');
					userpage.loadTableData();
				}

			})
	},

	//用户启用禁用
	btnFalse: function(param) {
		var ids = ""; //得到用户选择的数据的ID
		var rows = $('#mytable').bootstrapTable('getSelections');
		if(rows.length == 0) {
			if(param == 0)
				layer.alert("请选择要禁用的数据！");
			else
				layer.alert("请选择要启用的数据！");
			return;
		};
		if(param == 0) {
			var message = "确定要禁用？";
			var status = "0";
		} else {
			var message = "确定要启用？";
			var status = "1";
		}
		layer.confirm(message, {
				btn: ['确定', '取消'],
				title: "提示"
			},
			function() {
				for(var i = 0; i < rows.length; i++) {
					ids += rows[i].ID + ',';
				}
				ids = ids.substring(0, ids.length - 1);
				Ter.getApi({
						apiname: '/user/isuse',
						params: {
							"ids": ids,
							"status": status
						}
					},
					function(res) {
						if(res.errCode == "SUCCESS") {
							layer.alert(res.errMsg)
							userpage.loadTableData();
						}
					})
			}
		)
	},
	//实现删除数据的方法
	btnDelete: function() {
		var ids = ""; //得到用户选择的数据的ID
		var rows = $('#mytable').bootstrapTable('getSelections');
		if(rows.length == 0) {
			layer.alert("请选择要删除的数据！")
			return;
		}

		layer.confirm("确认要删除？", {
				btn: ['确定', '取消'],
				title: "提示"
			},
			function() {
				for(var i = 0; i < rows.length; i++) {
					ids += rows[i].ID + ',';
				}
				ids = ids.substring(0, ids.length - 1);
				var dataStr = {
					"id": ids
				};
				Ter.getApi({
						apiname: '/user/delete',
						params: dataStr
					},
					function(res) {
						if(res.errCode == "SUCCESS") {
							layer.alert(res.errMsg)
							userpage.loadTableData();
						}

					})
			}
		)
	}

}
$(function() {
	userpage.init();
});