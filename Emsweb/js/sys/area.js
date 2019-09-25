var areaPage = {
	init: function() {
		areaPage.loadTable();
		areaPage.loadSlect();
	},
	loadTable: function() {
		$('#mytable').bootstrapTable({
			search: false,
			pagination: true,
			pageSize: 10,
			pageList: [10, 20, 50],
			showColumns: true,
			showRefresh: true,
			showToggle: true,
			locale: "zh-CN",
			uniqueId: "aid", //每一行的唯一标识，一般为主键列
			pageNumber: 1, //初始化加载第一页，默认第一页,并记录
			contentType: "application/x-www-form-urlencoded", //发送到服务起的数据编码类型
			striped: true,
			url: baseUrl + '/region/findAllRegion',
			method: 'post',
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
			}, ],
			onLoadSuccess: function() {},
			onLoadError: function() {
				showTips("数据加载失败！");
			},
			onDblClickRow: function(row, $element) {
				var id = row.aid;
				EditViewById(id, 'view');
			},
		});
	},

	//加载下拉框
	loadSlect: function() {
		$.ajax({
			type: 'post',
			url: baseUrl + '/region/findAllRegion',
			dataType: 'json',
			beforeSend: function() {
				//					obj.html('正在处理...');
			},
			success: function(datas) { //返回list数据并循环获取 
				alert("data" + datas)
				var select = $("#areaPid");
				for(var i = 0; i < datas.rows.length; i++) {
					select.append("<option value='" + datas.rows[i].aid + "'>" +
						datas.rows[i].aname + "</option>");
				}
			}
		});
	},
	//添加数据方法 提交表单
	btnOk: function() {
		var pid = $.trim($('#areaPid option:selected').val());
		var aName = $.trim($('#aName').val());
		$.ajax({
			url: baseUrl + "/region/addRegion",
			data: {
				"pid": pid,
				"aName": aName,
			},
			type: "post",
			beforeSend: function() {
				$("#myModal").html("<span style='color:blue'>正在处理...</span>");
				return true;
			},
			success: function(data) {
				if(null != data) {
					var msg = "添加";
					$("#myModal").html(
						"<span style='color:blueviolet'>恭喜，" + msg +
						"成功！</span>");
					alert(msg + "成功");
					//location.reload();
					$('#mytable').bootstrapTable('refresh');
				} else {
					$("#myModal").html("<span style='color:red'>失败，请重试</span>");
					alert('操作失败');
				}
			},
			error: function() {
				alert('area已存在');
			},
			complete: function() {
				$('#myModal').hide();
			}
		});
		return false;
	},

	//数据编辑
	btnEdit: function() {
		var rows = $('#mytable').bootstrapTable('getSelections');
		if(rows.length == 0) {
			alert("请选择一条数据进行编辑！")
			return;
		}
		$("#myModal").modal("show");
		$('#myModal').on('show.bs.modal', function(event) {
			var modal = $(this); //get modal itself
			modal.find('.modal-body #aName').text(rows[0].aname);
			modal.find('.modal-body #areaPid').text(rows[0].pId);
		});
         
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
			beforeSend: function() {
				//					obj.html('正在处理...');
			},
			success: function(json) {
				if(json.code == '1') {
					//成功
					alert("删除成功")

				} else {
					//出错
					//						obj.html('操作按钮').attr('has-click','0');
				}
			}
		});
		$('#mytable').bootstrapTable('refresh');

	}
}
$(function() {
	areaPage.init();
});