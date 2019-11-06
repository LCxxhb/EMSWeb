var rolesPage = {
	init: function() {
		rolesPage.loadTable(); //加载table
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
				visible: true
			}, {
				field: 'rolename',
				title: '角色名称'
			}, {
				field: 'permission',
				title: '角色权限'
			}, {
				field: 'describe',
				title: '角色描述'
			}, {
				field: 'lastUpdateBy',
				title: '更新人'
			}, {
				field: 'lastUpdateDate',
				title: '更新时间'
			}, {
				field: 'cz',
				title: '操作',
				formatter: rolesPage.action,
				align: 'center'
			}]
		});
		this.loadTableData();
	},

	//加载菜单table数据
	loadTableData: function() {
		var url = "/roles/findAll";
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

	//添加角色弹框
	btnadd: function() {
		$("#myModal").modal("show");
		$("#rolename").val('');
		$("#roledesc").val('');
		$("#id").val('');
	},
	//添加角色保存操作
	btnSave: function() {
		var rolename = $("#rolename").val();
		var roledesc = $("#roledesc").val();
		var roles = {
			"rolename": rolename,
			"describe": roledesc
		};
		console.log(roles);
		Ter.getApi({
				apiname: "/roles/insert",
				params: roles
			},
			function(res) {
				if(res.errCode == "SUCCESS") {
					layer.alert(res.errMsg);
					$('#myModal').modal('hide');
					rolesPage.loadTableData();
				}
			})
	},

	//实现删除数据的方法
	btnDelete: function() {
		var ids = ""; //得到选择的角色的ID
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
						apiname: '/roles/delete',
						params: dataStr
					},
					function(res) {
						if(res.errCode == "SUCCESS") {
							layer.alert(res.errMsg);
							rolesPage.loadTableData();
						}
					})
			}
		)
	},

	//操作方法
	action: function(value, row, index) {
		var col = '<a class="ter-visibleBtn" data-power="权限分配" onclick=rolesPage.permission("' + row.id + '","'+row.permission+'")>权限分配</ a>';
		return col;
	},
	//权限分配弹出框
	permission: function(id,permissionIds) {
		var zTree;
		$("#roleid").val(id);
		$("#permissionIds").val(permissionIds);
		Ter.getApi({
				apiname: '/menu/findAll',
			},
			function(res) {
				if(res.errCode == "SUCCESS") {
					console.log(res.result);
					treeNodes = res.result;

					var setting = {
						view: {
							dblClickExpand: false,
							showLine: true,
							selectedMulti: false
						},
						check: {
							enable: true, //每个节点是否显示
							chkStyle: "checkbox", //复选框类型
						},
						data: {
							simpleData: {
								enable: true,
								idKey: "id",
								pIdKey: "pid",
								rootPId: ""
							}
						},
						callback: {
							beforeClick: function(treeId, treeNode) {
								var zTree = $.fn.zTree.getZTreeObj("menuTree");
								if(treeNode.isParent) {
									zTree.expandNode(treeNode);
									return false;
								} else {
									return true;
								}
							},
							onCheck: rolesPage.onCheck
						}
					};
					var tree = $("#menuTree");
					tree = $.fn.zTree.init($("#menuTree"), setting, treeNodes);
					//默认选中
					var treeObj = $.fn.zTree.getZTreeObj("menuTree");
					var data =$("#permissionIds").val();
					var datas = data.split(',');
					for(var i = 0; i < datas.length; i++) {　　
						console.log(treeObj.getNodeByParam("id", datas[i], null));　
						treeObj.checkNode(treeObj.getNodeByParam("id", datas[i], null), true, false);
					}
				}
			});
		$("#permissionModal").modal("show");
	},

	//权限保存按钮
	btnOk: function() {
		var ids = "";
		//获取角色id
		var id = $("#roleid").val();
		//获取选中的树菜单列表
		var checkNodes = this.onCheck();
		//组装获取到的菜单id
		for(var i = 0; i < checkNodes.length; i++) {
			ids += checkNodes[i].id + ',';
		}
		ids = ids.substring(0, ids.length - 1);
		var dataStr = {
			"id": id,
			"permission": ids
		};
		console.log(dataStr);
		Ter.getApi({
				apiname: '/roles/setPermission',
				params: dataStr
			},
			function(res) {
				if(res.errCode == "SUCCESS") {
					layer.alert(res.errMsg);
					$('#permissionModal').modal('hide');
					rolesPage.loadTableData();
				}
			})
	},

	//获取选中的菜单节点
	onCheck: function(e, treeId, treeNode) {
		var treeObj = $.fn.zTree.getZTreeObj("menuTree");
		nodes = treeObj.getCheckedNodes(true);
		return nodes;
		for(var i = 0; i < nodes.length; i++) {
			v += nodes[i].name + ",";
			console.log("节点id:" + nodes[i].id + "节点名称" + v); //获取选中节点的值
		}
	},

}
$(function() {
	rolesPage.init();
});