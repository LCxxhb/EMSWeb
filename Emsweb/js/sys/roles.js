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
					title: 'ID'
				}, {
					field: 'rolename',
					title: '角色名称'
				}, {
					field: 'permission',
					title: '角色权限'
				},
				{
					field: 'lastupdateby',
					title: '更新人'
				}, {
					field: 'lastupdatedate',
					title: '更新时间'
				}, {
					field: 'cz',
					title: '操作',
					formatter: rolesPage.action,
					align: 'center'
				}
			]
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
	//操作方法
	action: function(value, row, index) {
		var col = '<a class="ter-visibleBtn" data-power="权限分配" onclick=rolesPage.permission("' + row.id + '")>权限分配</ a>';
		return col;
	},
	//权限分配弹出框
	permission:function(id){
		alert(id);
	}
}
$(function() {
	rolesPage.init();
});