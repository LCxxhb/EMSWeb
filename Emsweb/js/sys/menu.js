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
					title: '父级菜单'
				}, {
					field: 'lastupdateby',
					title: '更新人'
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
		var url="/menu/findAll";
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
	
}
$(function() {
	menuPage.init();
});