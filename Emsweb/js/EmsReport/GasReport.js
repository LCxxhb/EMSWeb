var GasReport = {
	init: function() {
		this.initDate(); //日期初始化
		this.calcTableHeight();
		this.initTable();
		this.chart();
		this.tabChange();
		this.LoadModalAreaSelect();
	},
	initDate: function() {
		//日开始
		jeDate("#startInstantDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD hh:mm:ss",
			zIndex: 3000,
			isTime: true
		});
		//日结束
		/*jeDate("#endInstantDate", {
		    onClose: false,
		    isinitVal: true,
		    isClear: false,
		    initDate: jeDate.nowDate(),
		    maxDate: jeDate.nowDate(),
		    theme: {bgcolor: "#0196c9", pnColor: "#00CCFF"},//主题色
		    format: "YYYY-MM-DD hh:mm:ss",
		    zIndex: 3000,
		    isTime: true
		});*/

	},
	calcTableHeight: function() {
		var t_height = $(".content-wrapper").height() - $(".page-btns-box").outerHeight();
		$(".page-main-box").outerHeight(t_height);
		return t_height - 50;
	},

	initTable: function() {
		var self = this;
		$('#instantTable').bootstrapTable({

			search: false,
			pagination: true,
			pageSize: 10,
			pageList: [5, 10, 15, 20],
			striped: true, //隔行变色
			columns: [{
				field: 'areaname',
				title: '分厂',
				align: 'center'
			}, {
				field: 'branchfactory',
				title: '区域',
				align: 'center'
			}, {
				field: 'collectionpoint',
				title: '采集点',
				align: 'center'
			}, {
				field: 'description',
				title: '采集点描述',
				align: 'center'
			}, {
				field: 'tagtype',
				title: '介质类型',
				align: 'center'
			}, {
				field: 'usetype',
				title: '产出/消耗',
				align: 'center'
			}, {
				field: 'tagval',
				title: '产出/消耗量',
				align: 'center'
			}, {
				field: 'readTime',
				title: '日期',
				align: 'center'
			}],

		});
	},
	//加载模态框区域以及下拉框
	LoadModalAreaSelect: function(id) {
		$("#gasFactory").empty();
		Ter.getApi({
				apiname: "/region/findByTwoRegion"
			},
			function(res) {
				if(res.result) {
					var select = $("#gasFactory");
					select.append("<option value=''>--请选择--</option>")
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
	//加载模态框区域二级下拉框
	loadChildSlect: function() {
		$("#gasArea").empty(); //重置下拉框
		var aid = $.trim($('#gasFactory option:selected').val()); //获取选中的区域
		var select = $("#gasArea");
		select.append("<option value=''>--请选择--</option>")
		if(aid == "") {
			layer.alert("请先选择分厂！")
			return;
		}
		Ter.getApi({
				apiname: '/region/findByPid',
				params: {
					"pid": aid
				}
			},
			function(res) {
				console.log(res);
				if(res.result) {
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].aid + "'>" +
							res.result[i].aname + "</option>");
					}
				}
			})
	},
	//按分厂查询数据绑定
	loadTableData: function() {
		var url = "/report/findByAreaname";
		var factoryName = $("#gasFactory option:checked").text();
		Ter.getApi({
				apiname: url,
				params: {
					"areaname": factoryName,
				}
			},
			function(res) {
				if(res.result) {
					console.log(res.result);
					//加载表格
					$("#instantTable").bootstrapTable('load', res.result);
				}
			});
		//		var areaUrl = "/report/findByBranchfactory";
		//		var branchfactory = $("#gasArea option:checked").text();
		//		Ter.getApi({
		//				apiname: areaUrl,
		//				params: {
		//					"branchfactory": branchfactory,
		//				}
		//			},
		//			function(res) {
		//				if(res.result) {
		//					console.log(res.result);
		//					//加载表格
		//					$("#instantTable").bootstrapTable('load', res.result);
		//				}
		//			})
	},
	LoadMediumTypeButton: function(id) {
		$("#MediumType").empty();
		var url = "/report/findByTag";
		//		var mediumName = document.getElementById(MediumType).valueOf();
		Ter.getApi({
				apiname: url
				//				params: {
				//					"mediumName": mediumName,
				//				}
			},
			function(res) {
				if(res.result) {

				}
			})
	},
	chart: function() {
		var instantChart = echarts.init($('#instantChart')[0]);
		option = {
			title: {
				text: '气体用量折线图'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['煤气', '氧气', '氮气', '氩气', '压缩空气']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			toolbox: {
				feature: {
					saveAsImage: {}
				}
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
			},
			yAxis: {
				type: 'value'
			},
			series: [{
					name: '煤气',
					type: 'line',
					stack: '总量',
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: '氧气',
					type: 'line',
					stack: '总量',
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: '氮气',
					type: 'line',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: '氩气',
					type: 'line',
					stack: '总量',
					data: [320, 332, 301, 334, 390, 330, 320]
				}, {
					name: '压缩空气',
					type: 'line',
					stack: '总量',
					data: [820, 932, 901, 934, 1290, 1330, 1320],
				}
			]
		};
		instantChart.setOption(option, true);
	},
	tabChange: function() {
		$(".ter-tab-head li").on("click", function() {
			position: absolute;
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".ter-tab-item").eq(index).show().siblings().hide();
			//$("#table").bootstrapTable("resetView");
		});

		/* $(".tree-head-jz").on("click", function() {
			var index = $(this).index();
			$(this).addClass("tree-hleft").siblings().addClass("tree-hright");
			$(this).removeClass("tree-hright").siblings().addClass("tree-hright");
			$(".ztree").eq(index).show().siblings().hide();
			//$("#table").bootstrapTable("resetView");
		}); */

	}
};
$(function() {
	GasReport.init();
});