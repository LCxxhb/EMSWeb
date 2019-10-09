var areaPage = {
	init: function() {
		areaPage.loadSlect(); //加载下拉框
		areaPage.loadTable(); //加载table
	},
	loadTable: function() {
		$('#mytable').bootstrapTable({
			pagination: true, //是否显示分页（*）
			striped: true, //隔行变色
			columns: [{
					checkbox: true,
					visible: true
				}, {
					field: 'aid',
					title: 'ID'
				}, {
					field: 'aname',
					title: '区域名称'
				}, {
					field: 'pid',
					title: '区域父id',
					visible: false
				},
				{
					field: 'pname',
					title: '父区域'
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

	//查询按钮事件绑定
	btnSearch: function() {
		this.loadTableData();
	},
	//加载table数据按照查询条件
	loadTableData: function() {
		var pid = $.trim($('#areaPid option:selected').val());

		var params = {};
		//一种情况,没有查询条件
		var url = '/region/findAllRegion';
		//一种情况一级下拉框有条件
		if(pid != "") {
			params = {
				"pid": pid
			};
			url = '/region/findByPid';
		};
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
	//加载下拉框
	loadSlect: function() {
		Ter.getApi({
				apiname: '/region/findByTwoRegion',
				params: {
					"pid": 2
				}
			},
			function(res) {

				if(res.result) {
					var select = $("#areaPid");
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].aid + "'>" +
							res.result[i].aname + "</option>");
					}

				}
			})
	},
	//区域二级下拉框onchange事件
	getAreaid: function() {
		$("#areaPid2").empty(); //重置下拉框
		var aid = $.trim($('#areaPid option:selected').val()); //获取选中的区域
		Ter.getApi({
				apiname: baseUrl + '/region/findByPid',
				params: {
					"pid": aid
				}
			},
			function(res) {
				console.log(res);
				if(res.data) {
					var select = $("#areaPid2");
					for(var i = 0; i < res.data.length; i++) {
						select.
						//						append('<option value=" ">'-请选择-'</option>').
						append("<option value='" + res.data[i].aid + "'>" +
							res.data[i].aname + "</option>");
					}
				}
			})
	},

	//添加编辑数据方法 提交表单
	btnOk: function() {
		var pid = $.trim($('#modalArea option:selected').val());
		var aname = $.trim($('#aName').val());
		var aid = $('#aid').val();
		var url;
		if(aid == null || aid == undefined || aid == "") { //区域添加
			url = '/region/addRegion';
			var region = {
				"pid": pid,
				"aname": aname
			}

		} else {
			url = '/region/updateRegion';
			var region = {
				"aid": aid,
				"pid": pid,
				"aname": aname
			}
		}
		Ter.getApi({
				apiname: url,
				params: region
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
	LoadModalSelect: function(pid) {
		$("#modalArea").empty();
		Ter.getApi({
				apiname: "/region/findByOneTwoRegion"
			},
			function(res) {
				if(res.result) {
					var select = $("#modalArea");
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
	//数据添加、编辑
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
					ids += rows[i].aid + ',';
				}
				ids = ids.substring(0, ids.length - 1);
				var dataStr = {
					"aid": ids
				};
				Ter.getApi({
						apiname: '/region/deleteRegion',
						params: dataStr
					},
					function(res) {
						if(res.errCode == "SUCCESS") {
							layer.alert(res.errMsg)
							areaPage.loadSlect();
							areaPage.loadTableData();
						}

					})
			}
		)

	}
}
$(function() {
	areaPage.init();
});