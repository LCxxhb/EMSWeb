/***用水报表****/
var reportType = "",
	startDate = "",
	endDate = "";
var waterReport = {
	init: function() {
		this.initDate(); //日期初始化
		//this.initTree();//目录树        
		//this.initInstantTable();//列表初始化
		//this.reportType();//报表类型切换
		this.initTable();
		this.calcTableHeight();
		this.chart();
		this.tabChange();
		this.LoadModalAreaSelect()
	},
	initDate: function() {
		var self = this;
		//日开始
		jeDate("#startInstantDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			/*initDate: [{ DD: "-3" }, true],
			maxDate: jeDate.nowDate(-1),*/
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			isTime: true,
		});
	},
	calcTableHeight: function() {
		var t_height = $(".content-wrapper").height() - $(".page-btns-box").outerHeight() - 60;
		$(".page-main-box").outerHeight(t_height);
		return t_height - 50;
	},
	//日平均压力、月平均压力列表
	initTable: function() {
		var self = this;
		//$("#preInstantTable").show().siblings().hide();
		$("#waterTable").bootstrapTable({
			/* height: self.calcTableHeight(), */
			search: false,
			pagination: true,
			pageSize: 10,
			pageList: [5, 10, 15, 20],
			striped: true, //隔行变色
			search: true, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端
			strictSearch: false, //是否全局匹配,false模糊匹配
			showColumns: true, //是否显示所有的列
			showRefresh: true, //是否显示刷新按钮
			clickToSelect: false, //是否启用点击选中行
			showToggle: true, //是否显示详细视图和列表视图的切换按钮
			cardView: false, //是否显示详细视图
			detailView: false, //是否显示父子表
			//导出excel表格设置
			showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
			exportDataType: "all", //basic', 'all', 'selected'.
			exportTypes: ['excel', 'xlsx'], //导出类型
			exportOptions: {
				//ignoreColumn: [0,0],            //忽略某一列的索引
				fileName: '水报表', //文件名称设置
				worksheetName: 'Sheet1', //表格工作区名称
				tableName: '水报表',
				//excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
			},
			columns: [{
			    field: 'AREANAME',
			    title: '分厂',
			    align: 'center'
			   }, {
			    field: 'BRANCHFACTORY',
			    title: '区域',
			    align: 'center'
			   }, {
			    field: 'COLLECTIONPOINT',
			    title: '采集点',
			    align: 'center'
			   }, {
			    field: 'DESCRIPTION',
			    title: '采集点描述',
			    align: 'center'
			   }, {
			    field: 'TAGTYPE',
			    title: '介质类型',
			    align: 'center'
			   }, {
			    field: 'USETYPE',
			    title: '产出/消耗',
			    align: 'center'
			   }, {
			    field: 'TAGVAL',
			    title: '产出/消耗量',
			    align: 'center'
			   }, {
			    field: 'READTIME',
			    title: '日期',
			    align: 'center',
			    formatter: function(value) {
			        //通过判断单元格的值，来格式化单元格，返回的值即为格式化后包含的元素
			        var date = new Date(value).toLocaleString();
			        return date;
			       }
			   }],
		});
	},
	//加载模态框区域以及下拉框
	LoadModalAreaSelect: function(id) {
		$("#waterArea").empty();
		Ter.getApi({
				apiname: "/region/findByTwoRegion"
			},
			function(res) {
				if (res.result) {
					var select = $("#waterArea");
					select.append("<option value=''>--请选择--</option>")
					for (var i = 0; i < res.result.length; i++) {
						if (id == res.result[i].aid) {
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
		$("#waterFactory").empty(); //重置下拉框
		var aid = $.trim($('#waterArea option:selected').val()); //获取选中的区域
		var select = $("#waterFactory");
		select.append("<option value=''>--请选择--</option>")
		if (aid == "") {
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
				if (res.result) {
					for (var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].aid + "'>" +
							res.result[i].aname + "</option>");
					}
				}
			})
	},
	//按分厂查询数据绑定
	loadTableData: function() {
		var url = "/EmsReport/findWaterByFactoryOrAreaOrTagtype";
		var factoryName = $("#waterArea option:checked").text();
		var branchfactory=$("#waterFactory option:checked").text();
		var readtime = document.getElementById("startInstantDate").value;
		Ter.getApi({
			apiname: url,
		    params: {
				"areaname": factoryName,
				"branchfactory":branchfactory,
				"readtime" :readtime,
				},
			},
			function(res) {
				if (res.result) {
					console.log(res.result);
					//加载表格
					$("#waterTable").bootstrapTable('load', res.result);
				}
			});
	},
	chart: function() {
		var waterChart = echarts.init($('#waterChart')[0]);
		option = {
			title: {
				text: '水用量折线图'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['原水', '软水', '净环水', '浊环水']
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
					name: '原水',
					type: 'line',
					stack: '总量',
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: '软水',
					type: 'line',
					stack: '总量',
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: '净环水',
					type: 'line',
					stack: '总量',
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: '浊环水',
					type: 'line',
					stack: '总量',
					data: [320, 332, 301, 334, 390, 330, 320]
				}
			]
		};
		waterChart.setOption(option, true);
	},
	tabChange: function() {
		$(".ter-tab-head li").on("click", function() {
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".ter-tab-item").eq(index).show().siblings().hide();
			//$("#table").bootstrapTable("resetView");
		});
	}
};
//初始化
$(function() {
	waterReport.init();
})
