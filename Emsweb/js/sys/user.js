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
				visible: false,
			}, {
				field: 'username',
				title: '用户名称'
			}, {
				field: 'role_id',
				title: '角色',
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
	//加载模态框下拉框
	LoadModalSelect: function(pid) {
		$("#role_id").empty();
		Ter.getApi({
				apiname: " "
			},
			function(res) {
				if(res.result) {
					var select = $("#role_id");
					for(var i = 0; i < res.result.length; i++) {
						if(pid == res.result[i].aname) {
							select.append("<option value='" + res.result[i].aid + "' selected='selected'>" +
								res.result[i].aname + "</option>");
						} else {
							select.append("<option value='" + res.result[i].aid + "'>" +
								res.result[i].aname + "</option>");
						}
					}
				}
			})

		// 		if (pid != "") {
		// 			//$("#modalArea").val(pid+'');
		// 			$("#modalArea").find("option[text=" + pid + "]").attr("selected", true);
		// 		}
		// 
	},
	//查询按钮事件绑定
	btnSearch: function() {
		this.loadTableData();
	},
	//加载table数据
	loadTableData: function() {
		var url = '/user/findAll';
		Ter.getApi({
				apiname: url
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
			$('#aName').val();
			$('#aid').val();
			this.LoadModalSelect("");

		} else {
			var rows = $('#mytable').bootstrapTable('getSelections');
			if(rows.length != 1) {
				layer.alert("请选择一条数据进行编辑！")
				return;
			}
			//会显选中的数据	
			$("#myModal").modal("show");
			$('#aName').val(rows[0].aname);
			$('#aid').val(rows[0].aid);

			this.LoadModalSelect(rows[0].pname);
		}

	},
	//用户权限管理
	btninfo: function() {
			//会显选中的数据	
			$("#myModal1").modal("show");
			var setting = {
				view: {
					selectedMulti: false
				},
				check: {
					enable: true
				},
				data: {
					simpleData: {
						enable: true
					}
				},
				edit: {
					enable: true
				}
			};
				
			var zNodes = [{
					id: 1,
					pId: 0,
					name: "权限管理1",
					open: true
				},
				{
					id: 101,
					pId: 1,
					name: "权限管理1-1"
				},
				{
					id: 102,
					pId: 1,
					name: "权限管理1-2"
				},
				{
					id: 103,
					pId: 1,
					name: "权限管理1-3"
				},
				{
					id: 104,
					pId: 1,
					name: "权限管理1-4"
				},
				{
					id: 108,
					pId: 1,
					name: "权限管理1-5"
				},
				{
					id: 109,
					pId: 1,
					name: "权限管理1-6"
				},
				{
					id: 110,
					pId: 1,
					name: "权限管理1-7"
				},
				{
					id: 111,
					pId: 1,
					name: "权限管理1-8"
				},
				{
					id: 112,
					pId: 1,
					name: "权限管理1-9"
				},
				{
					id: 113,
					pId: 1,
					name: "权限管理1-10"
				},
				{
					id: 114,
					pId: 1,
					name: "权限管理1-11"
				},
				
				{
					id: 2,
					pId: 0,
					name: "权限管理2",
					open: false
				},
				{
					id: 201,
					pId: 2,
					name: "权限管理2-1"
				},
				{
					id: 206,
					pId: 2,
					name: "权限管理2-2"
				},
				{
					id: 207,
					pId: 2,
					name: "权限管理2-3"
				},
				{
					id: 208,
					pId: 2,
					name: "权限管理2-4"
				},
				{
					id: 209,
					pId: 2,
					name: "权限管理2-5"
				},
				{
					id: 210,
					pId: 2,
					name: "权限管理2-6"
				},
				{
					id: 211,
					pId: 2,
					name: "权限管理2-7"
				},
				{
					id: 3,
					pId: 0,
					name: "权限管理3",
					open: false
				},
				{
					id: 301,
					pId: 3,
					name: "权限管理3-1"
				},
				{
					id: 302,
					pId: 3,
					name: "权限管理3-2"
				},
				{
					id: 303,
					pId: 3,
					name: "权限管理3-3"
				},
				
				{
					id: 4,
					pId: 0,
					name: "权限管理4",
					open: false
				},
				{
					id: 401,
					pId: 4,
					name: "权限管理4-1"
				},
				{
					id: 402,
					pId: 4,
					name: "权限管理4-2"
				},
				{
					id: 403,
					pId: 4,
					name: "权限管理4-3"
				},
				
				{
					id: 5,
					pId: 0,
					name: "权限管理5",
					open: false
				},
				{
					id: 501,
					pId: 5,
					name: "权限管理5-1"
				},
				{
					id: 502,
					pId: 5,
					name: "权限管理5-2"
				},
				{
					id: 503,
					pId: 5,
					name: "权限管理5-3"
				},
				
				{
					id: 6,
					pId: 0,
					name: "权限管理6",
					open: false
				},
				{
					id: 601,
					pId: 6,
					name: "隐藏普通节点"
				},
				{
					id: 602,
					pId: 6,
					name: "权限管理6-1"
				},
				{
					id: 603,
					pId: 6,
					name: "权限管理6-1"
				}
			];
				
			$(document).ready(function() {
				$.fn.zTree.init($("#treeDemo"), setting, zNodes);
			});
				
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