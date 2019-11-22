var menuPage = {
	init: function() {
		menuPage.loadTable(); //加载table
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
					title: 'ID'
				}, {
					field: 'menuname',
					title: '菜单名称'
				}, {
					field: 'munuurl',
					title: '菜单路径'
				},
				{
					field: 'pid',
					title: '父级菜单',
					visible: false
				}, {
					field: 'spare',
					title: '排序'
				}, {
					field: 'lastupdatedate',
					title: '更新时间'
				}, {
					field: 'lastupdatedate',
					title: '更新时间'
				}
			]
		});
		this.loadTableData();
	},

	//加载菜单table数据
	loadTableData: function() {
		var url = "/menu/findAll";
		Ter.getApi({
				apiname: url,
			},
			function(res) {
				if(res.result) {
					//加载表格
					$("#mytable").bootstrapTable('load', res.result);
				}
			})
	},

	//加载模态框父级菜单下拉框
	LoadModalMenuSelect: function(id) {
		$("#parentMenu").empty();
		Ter.getApi({
				apiname: "/menu/findParentMenu"
			},
			function(res) {
				if(res.result) {
					var select = $("#parentMenu");
					for(var i = 0; i < res.result.length; i++) {
						if(id == res.result[i].id) {
							select.append("<option value='" + res.result[i].id + "' selected='selected'>" +
								res.result[i].menuname + "</option>");
						} else {
							select.append("<option value='" + res.result[i].id + "'>" +
								res.result[i].menuname + "</option>");
						}
					}
				}
			})
	},

	//菜单添加、编辑
	btnEdit: function(parm) {
		if(parm == 0) {
			$("#myModal").modal("show");
			$('#title').html('新增菜单');
			$('#menuname').val('');
			$('#menuurl').val('');
			$('#order').val('');
			$('#id').val('');
			this.LoadModalMenuSelect("");
		} else {
			var rows = $('#mytable').bootstrapTable('getSelections');
			if(rows.length != 1) {
				layer.alert("请选择一条数据进行编辑！")
				return;
			}
			console.log(rows[0])
			//会显选中的菜单信息
			$("#myModal").modal("show");
			$('#title').html('编辑菜单');
			$('#menuname').val(rows[0].menuname);
			$('#menuurl').val(rows[0].munuurl);
			$('#order').val(rows[0].order);
			$('#id').val(rows[0].id);
			this.LoadModalMenuSelect(rows[0].pid);
		}

	},

	//添加编辑数据方法 提交表单
	btnOk: function() {
		var pid = $.trim($('#parentMenu option:selected').val());
		var id = $('#id').val();
		var menuname = $('#menuname').val();
		var munuurl = $('#menuurl').val();
		var order = $('#order').val();
		var url;
		if(id == null || id == undefined || id == "") { //菜单添加
			url = '/menu/insert';
			var menu = {
				"pid": pid,
				"menuname": menuname,
				"munuurl": munuurl,
				"spare": order
			}
		} else {
			url = '/menu/update';
			var menu = {
				"pid": pid,
				"id": id,
				"menuname": menuname,
				"munuurl": munuurl,
				"spare": order
			}
		}
		Ter.getApi({
				apiname: url,
				params: menu
			},
			function(res) {
				if(res.errCode == "SUCCESS") {
					layer.alert(res.errMsg);
					$('#myModal').modal('hide');
					menuPage.loadTableData();
				}

			})
	},

	//实现菜单删除的方法
	btnDelete: function() {
		var ids = ""; //得到菜单选择的数据的ID
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
						apiname: '/menu/delete',
						params: dataStr
					},
					function(res) {
						if(res.errCode == "SUCCESS") {
							layer.alert(res.errMsg)
							menuPage.loadTableData();
						}
					})
			}
		)
	}

}
$(function() {
	menuPage.init();
});