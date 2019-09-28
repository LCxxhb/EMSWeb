var areaPage = {
	init: function() {
		areaPage.loadTable(); //加载table
		areaPage.loadSlect(); //加载下拉框
		//		areaPage.loadaddSlect(); //加载新增区域下拉框
	},
	loadTable: function() {
		$('#mytable').bootstrapTable({
			pagination: true, //是否显示分页（*）
			showRefresh: true,
			columns: [{
				checkbox: true,
				visible: true
			}, {
				field: 'aid',
				title: '区域id'
			}, {
				field: 'aname',
				title: '区域名称'
			}, {
				field: 'pid',
				title: '区域父id'
			}, {
				field: 'lastupdatedate',
				title: '更新时间'
			}, {
				field: 'createdate',
				title: '创建时间'
			}, {
				field: 'createby',
				title: '创建人'
			}, ]
		});
		this.loadTableData();
	},

	//查询按钮事件绑定
	btnSearch: function() {
		this.loadTableData();
	},
	//重置按钮
	btnReset: function() {
		//		$("#areaPid").empty(); //重置下拉框
		$("#areaPid").val("");
		$("#areaPid2").val("");
		this.loadTableData();
	},
	//加载table数据按照查询条件
	loadTableData: function() {
		var pid = $.trim($('#areaPid option:selected').val());
		var pid2 = $.trim($('#areaPid2 option:selected').val());
		var params = {};
		//一种情况,没有查询条件
		var url = baseUrl + '/region/findAllRegion';
		//一种情况一级下拉框有条件
		if(pid != "") {
			params = {
				"pid": pid
			};
			var url = baseUrl + '/region/findByPid';
		};
		//一种情况一,二级下拉框都有条件			
		if(pid != "" && pid2 != "") {
			params = {
				"pid": pid2,
			};
			var url = baseUrl + '/region/findByPid';
		};
		Ter.getApi({
				apiname: url,
				params: params
			},
			function(res) {
				console.log(res);

				if(res.data) {
					//加载表格
					$("#mytable").bootstrapTable('load', res.data);
					
					//加载区域添加下拉框
					var select1 = $("#areaPid1");
					select1.empty();
					for(var i = 0; i < res.data.length; i++) {
						select1.append("<option value='" + res.data[i].aid + "'>" +
							res.data[i].aname + "</option>");
					}

				}
			})
	},
	//加载下拉框
	loadSlect: function() {
		Ter.getApi({
				apiname: baseUrl + '/region/findByPid',
				params: {
					"pid": 2
				}
			},
			function(res) {
				console.log(res);
				if(res.data) {
					var select = $("#areaPid");
					for(var i = 0; i < res.data.length; i++) {
						select.append("<option value='" + res.data[i].aid + "'>" +
							res.data[i].aname + "</option>");
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
		var pid = $.trim($('#areaPid1 option:selected').val());
		var aname = $.trim($('#aName').val());
		var aid = $('#aid').val();
		console.log("aid" + aid);
		if(aid == null || aid == undefined || aid == "") { //区域添加
			var url = baseUrl + '/region/addRegion';
			var region = {
				"pid": pid,
				"aname": aname
			}
			alert("添加区域");
		} else { 
			alert("区域编辑");
			var url = baseUrl + '/region/updateRegion';
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
				debugger;
				console.log(res);
				if(1 == res.code) {
					layer.alert(res.message);
				} else {
					layer.alert(res.message);
				}
				$('#myModal').modal('hide');
				areaPage.loadTableData(); //加载table
				this.loadSlect(); //加载下拉框
			})
	},

	//数据编辑
	btnEdit: function() {
		var rows = $('#mytable').bootstrapTable('getSelections');
		if(rows.length != 1) {
			layer.alert("请选择一条数据进行编辑！")
			return;
		}
		//会显选中的数据	
		$("#myModal").modal("show");
		$('#aName').val(rows[0].aname);
		$('#aid').val(rows[0].aid);
		$("#areaPid1").find("option[text=" + rows[0].pid + "]").attr("selected", true);
		this.btnOk; //调用提交数据方法
	},

	//实现删除数据的方法
	btnDelete: function() {
		var ids = ""; //得到用户选择的数据的ID
		var rows = $('#mytable').bootstrapTable('getSelections');
		if(rows.length == 0) {
			alert("请选择要删除的数据！")
			return;
		}
		if(!confirm("确认要删除？")) {
			window.event.returnValue = false;
			return;
		}
		for(var i = 0; i < rows.length; i++) {
			ids += rows[i].aid + ',';
		}
		ids = ids.substring(0, ids.length - 1);
		var dataStr = {
			"aid": ids
		};
		$.ajax({
			type: 'post',
			url: baseUrl + '/region/deleteRegion',
			dataType: 'json',
			data: dataStr,
			success: function(res) {
				if(res.code == '1') {
					//成功
					layer.alert(res.message)
					//$('#mytable').bootstrapTable('refresh');
				} else {
					layer.alert(res.message)
				};
				areaPage.loadTableData(); //加载table
				this.loadSlect(); //加载下拉框
			}
		});

	}
}
$(function() {
	areaPage.init();
});