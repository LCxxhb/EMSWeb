var planPage = {
	init: function() {
		planPage.loadTable(); //加载table
		planPage.initDate(); //初始化日期控件
		planPage.LoadAreaSelect(); //加载页面区域下拉框
		planPage.loadParentMediaSlect(); //加载页面介质
	},

	//table
	loadTable: function() {
		$('#planTable').bootstrapTable({
			pagination: true, //是否显示分页（*）
			striped: true, //隔行变色
			columns: [{
				checkbox: true,//添加复选框
				visible: true //设置复选框可见
			}, {
				field: 'id',
				title: '序号'
			}, {
				field: 'planTypeName',
				title: '计划类型'
			},{
				field: 'planType',
				title: '计划类型id',
				visible: false //设置该元素不可见
			}, {
				field: 'startTime',
				title: '开始时间'
			}, {
				field: 'areaId',
				title: '区域id',
				visible: false //设置该元素不可见
			}, {
				field: 'area',
				title: '区域'
			}, {
				field: 'mediaName',
				title: '介质类型'
			}, {
				field: 'mediaId',
				title: '介质类型id',
				visible: false //设置该元素不可见
			}, {
				field: 'measureMent',
				title: '介质单位',
				visible: false //设置该元素不可见
			},{
				field: 'planOutputTotal',
				title: '计划产出总量',
				formatter: function(value, row, index) {
					//通过formatter可以自定义列显示的内容
					//value：当前field的值，即id
					//row：当前行的数据					
						return value+row.measureMent;
					
				},
			}, {
				field: 'planUseTotal',
				title: '计划消耗总量',
				formatter: function(value, row, index) {
						return value+row.measureMent;
				},
			}, {
				field: 'createBy',
				title: '创建人',
			}, {
				field: 'createDate',
				title: '创建时间',
				visible: false //设置该元素不可见
			}, {
				field: 'updateTime',
				title: '编辑时间',
				visible: false //设置该元素不可见
			}]
		});
		this.loadTableData();
	},

	//加载页面介质类型下拉框
	loadParentMediaSlect: function() {
		$("#mediaName").empty();
		Ter.getApi({
				apiname: "/Media/findAllMedia"
			},
			function(res) {
				console.log(res.result);
				if(res.result) {
					var select = $("#mediaName");
					select.append("<option value=''>-请选择-</option>");
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].id + "'>" +
							res.result[i].mediaName + "</option>");
					}
				}
			})
	},

	//加载页面区域下拉框
	LoadAreaSelect: function(id) {
		$("#areaName").empty();
		Ter.getApi({
				apiname: "/region/findAllRegion"
			},
			function(res) {
				if(res.result) {
					var select = $("#areaName");
					select.append("<option value=''>-请选择-</option>");
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

	//页面日期控件
	initDate: function() {
		//日开始
		jeDate("#startDayDate", {
			onClose: false,
			isinitVal: false,
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			clearfun:function(elem, val) {
	
			},
		});
		//日结束
		jeDate("#endDayDate", {
			onClose: false,
			isinitVal: false,
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,	
		});

		// 模态框 日开始
		jeDate("#modelStartDayDate", {
			onClose: false,
			isinitVal: false,
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
		});
	},
	
	//查询按钮
	btnSearch: function() {
		planPage.loadTableData();
	},
	//查看所有数据 
	loadTableData: function() {
		var mediaid = $.trim($('#mediaName option:selected').val());
		var areaid= $.trim($('#areaName option:selected').val());
		var reportType = $.trim($('#reportType option:selected').val());
		var startDayDate = $.trim($('#startDayDate').val());
		var endDayDate = $.trim($('#endDayDate').val());
		//查询前开始日期结束日期做判断
		
		var params = {
			"mediaId": mediaid,
			"areaId": areaid,
			"planType": reportType,
			"beginTime": startDayDate,
			"endTime": endDayDate,
		};
		var url = "/plan/findAll";
		Ter.getApi({
				apiname: url,
				params:params
			},
			function(res) {
				if(res.result) {
					console.log(res.result);
					//加载表格
					$("#planTable").bootstrapTable('load', res.result);
				}
			})
	},
	//导出按钮
btnExport: function() {
	alert("导出")
//		Ter.getApi({
//				apiname: ""
//			},
//			function(res) {
//				if(res.result) {
//					
//					layer.alert(res.errMsg);
//				}
//			})
	},
	
	//加载模态框介质类型下拉框
	loadModelMediaSlect: function(id) {
		$("#modelMedia").empty();
		Ter.getApi({
				apiname: "/Media/findAllMedia"
			},
			function(res) {
				console.log(res.result);
				if(res.result) {
					var select = $("#modelMedia");
					select.append("<option value=''>-请选择-</option>");
					for(var i = 0; i < res.result.length; i++) {
						if(id == res.result[i].id) {
							select.append("<option value='" + res.result[i].id + "' selected='selected'>" +
								res.result[i].mediaName + "</option>");
						} else {
							select.append("<option value='" + res.result[i].id + "'>" +
								res.result[i].mediaName + "</option>");
						}
					}
				}
			})
	},
	//计划类型
	loadPlantypeSlect: function(id) {
		
var numbers = $("#planType").find("option"); //获取select下拉框的所有值
     for (var j = 1; j < numbers.length; j++) {
        if ($(numbers[j]).val() == id) {
             $(numbers[j]).attr("selected", "selected");
           }
     }
	
		
	},
	//加载模态框区域下拉框
	loadModalAreaSelect: function(id) {
		$("#modelArea").empty();
		Ter.getApi({
				apiname: "/region/findAllRegion"
			},
			function(res) {
				if(res.result) {
					var select = $("#modelArea");
					select.append("<option value=''>-请选择-</option>");
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

	//计划添加、修改
	btnEdit: function(parm) {
		if(parm == 0) {
			$("#name").html("新增计划");		
			$("#planModal").modal("show");
			$('#planId').val();
			$('#modelStartDayDate').val('');
			$('#danwei').val('');
			$('#planUseTotal').val('');
			$('#planOutputTotal').val(''); //新增时使模态框置空
			this.loadModalAreaSelect(""); //加载模态框区域下拉框
			this.loadModelMediaSlect(""); //加载模态框介质下拉框
			this.loadPlantypeSlect(""); //加载计划类型

		} else {
			var rows = $('#planTable').bootstrapTable('getSelections');
			if(rows.length != 1) {
				layer.alert("请选择一条数据进行编辑！")
				return;
			}
			console.log(rows[0])
			$("#name").html("编辑计划");
			//会显示选中的用户信息
			$("#planModal").modal("show");
			$('#planId').val(rows[0].id);
			$('#modelStartDayDate').val(rows[0].startTime);
			$('#danwei').val(rows[0].measureMent);
			$('#planUseTotal').val(rows[0].planUseTotal);
			$('#planOutputTotal').val(rows[0].planOutputTotal);
			this.loadModalAreaSelect(rows[0].areaId); //加载区域下拉框
			this.loadModelMediaSlect(rows[0].mediaId); //加载介质下拉框
			this.loadPlantypeSlect(rows[0].planType); //加载计划类型
		}

	},

	//添加修改数据方法 提交表单
	btnOk: function() {
		var planId = $('#planId').val();
		var startTime = $('#modelStartDayDate').val();
		var danwei = $('#danwei').val();
		var planUseTotal = $('#planUseTotal').val();
		var planOutputTotal = $('#planOutputTotal').val();
		var planTypeId = $.trim($('#planType option:selected').val());
		var planType = $.trim($('#planType option:selected').text());
		var modelAreaId = $.trim($('#modelArea option:selected').val());
		var modelArea = $.trim($('#modelArea option:selected').text());
		var modelMediaId = $.trim($('#modelMedia option:selected').val());
		var modelMedia = $.trim($('#modelMedia option:selected').text());
		if(planTypeId == null || planTypeId == undefined || planTypeId == ""){
			layer.alert("请选择计划类型！");
			return;
		};
		if(danwei == null || danwei == undefined || danwei == ""){
			layer.alert("请输入介质单位！");
			return;
		};
		if(planUseTotal == null || planUseTotal == undefined || planUseTotal == ""){
			layer.alert("请输入计划消耗总量值！");
			return;
		};
		if(planOutputTotal == null || planOutputTotal == undefined || planOutputTotal == ""){
			layer.alert("请输入计划产出总量值！");
			return;
		};
		if(modelAreaId == null || modelAreaId == undefined || modelAreaId == ""){
			layer.alert("请选择区域！");
			return;
		};
		if(modelMediaId == null || modelMediaId == undefined || modelMediaId == ""){
			layer.alert("请选择介质类型！");
			return;
		};
		var url;
		//需要保存对象
		var plan = {
			"id": planId,
			"startTime": startTime,
			"measureMent": danwei,
			"planOutputTotal":planOutputTotal ,
			"planUseTotal": planUseTotal,
			"planType":planTypeId ,
			"planTypeName": planType,
			"areaId": modelAreaId,
			"area":modelArea ,
			"mediaId": modelMediaId,
			"mediaName":modelMedia,
		
		};

		if(planId == null || planId == undefined || planId == "") { //添加计划

			url = '/plan/insert';
			Ter.getApi({
					apiname: url,
					params: plan
				},
				function(res) {
					if(res.errCode == "SUCCESS") {
						layer.alert(res.errMsg);
						$('#planModal').modal('hide');
						planPage.loadTableData();
					}
				})
		} else {

			url = '/plan/update';
			Ter.getApi({
					apiname: url,
					params: plan
				},
				function(res) {
					if(res.errCode == "SUCCESS") {
						layer.alert(res.errMsg);
						$('#planModal').modal('hide');
						planPage.loadTableData();
					}

				})
		}
	},

	//实现删除计划的方法
	btnDelete: function() {
		var ids = ""; //得到选择的数据的ID
		var rows = $('#planTable').bootstrapTable('getSelections');
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
						apiname: '/plan/delete',
						params: dataStr
					},
					function(res) {
						if(res.errCode == "SUCCESS") {
							layer.alert(res.errMsg)
							planPage.loadTableData();
						}
					})
			}
		)
	}

}
$(function() {
	planPage.init();
});