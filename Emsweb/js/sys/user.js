var userpage = {
	init: function() {
		userpage.loadTable(); //加载table
	},
	loadTable: function() {
		$('#mytable').bootstrapTable({
			pagination: true, //是否显示分页（*）
			striped: true, //隔行变色
			columns: [{
				checkbox: true,
				visible: true
			}, {
				field: 'id',
				title: 'ID',				
			}, {
				field: 'username',
				title: '用户名称'
			}, {
				field: 'roleId',
				title: '角色',
				formatter: function(value,row,index){
                         //通过formatter可以自定义列显示的内容
                         //value：当前field的值，即id
                         //row：当前行的数据
                         if (0==value) {
                         	return "管理员";
                         } else{
                         	return "用户";
                         }  
                    } ,
			}, {
				field: 'areaId',
				title: '区域id',
				visible: false,
			}, {
				field: 'status',
				title: '状态',
			}, {
				field: 'create_by',
				title: '创建人',
			}, {
				field: 'create_date',
				title: '创建时间',
			}, {
				field: 'last_update_by',
				title: '最后更新人',
			}, {
				field: 'last_update_date',
				title: '最后更新时间',
			}]
		});
		this.loadTableData();
	},
	
	//加载搜索条件下拉框
	loadSlect: function() {
		Ter.getApi({
				apiname: '',
			},
			function(res) {
				if(res.result) {
					var select = $("#usertype");
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].id + "'>" +
							res.result[i].name + "</option>");
					}
				}
			})
	},
	//加载角色模态框下拉框
	LoadModalRoleSelect: function(id) {
		$("#role_id").empty();
		Ter.getApi({
				apiname: " "
			},
			function(res) {
				if(res.result) {
					var select = $("#role_id");
					for(var i = 0; i < res.result.length; i++) {
						if(id == res.result[i].id) {
							select.append("<option value='" + res.result[i].id + "' selected='selected'>" +
								res.result[i].name + "</option>");
						} else {
							select.append("<option value='" + res.result[i].id + "'>" +
								res.result[i].name + "</option>");
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
		var username =$.trim($('#role_id').val());
		var params={
			"roleId":role_id,
			"username":username,
		};	
		var url = '/user/findAll';
		Ter.getApi({
				apiname: url,
				params: params
			},
			function(res) {
				if(res.result) {
					//加载表格
					$("#mytable").bootstrapTable('load', res.result);
				}
			})
	},
	//用户添加、编辑
	btnEdit: function(parm) {
		if(parm == 0) {
			$("#myModal").modal("show");
			$('#role_id').val();
			$('#area_id').val();
			$('#id').val();
			$('#username').val();
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
			$('#role_id').val(rows[0].roleId);
			$('#area_id').val(rows[0].areaId);
			$('#id').val(rows[0].id);
			$('#username').val(rows[0].username);
			this.LoadModalRoleSelect(rows[0].roleId);
			this.LoadModalAreaSelect(rows[0].areaId);
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
				"area_id": area_id,
				"role_id": role_id
			}

		} else {
			url = '/user/update';
			var user = {
				"id": id,
				"username": username,
				"area_id": area_id,
				"role_id": role_id
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
					areaPage.loadSlect();
					areaPage.loadTableData();

				}

			})
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
					ids += rows[i].id + ',';
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
							//							userpage.loadSlect();
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