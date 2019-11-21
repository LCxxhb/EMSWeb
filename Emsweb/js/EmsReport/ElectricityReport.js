/**用电量报表**/
var reportType, startDate, endDate;
var electricityReport = {
	init: function() {
		this.initDate();
		//this.initTree();
		//this.initAreaTree();
		//this.reportType();
		this.initTable();
		this.chart();
		this.tabChange();
		this.calcTableHeight();
		this.LoadModalAreaSelect()
	},
	initDate: function() {
		//日开始
		jeDate("#startDayDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: [{
				MM: "-1"
			}, true],
			maxDate: jeDate.nowDate(-1),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			isTime: true,
			/* donefun: function(obj) {
				console.log(obj.val);
				$("#endDayDate").val(electricityReport.addDate(obj.val, 3));
			}, */
		});
		/* //日结束
		jeDate("#endDayDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: [{
				DD: "-1"
			}, true],
			maxDate: jeDate.nowDate(-1),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			isTime: true,
		});
		//月开始
		jeDate("#startMonthDate", {
			isinitVal: true,
			isClear: false,
			initDate: [{
				MM: "-1"
			}, true],
			maxDate: jeDate.nowDate(-1),
			minDate: jeDate.nowDate({
				MM: "-12"
			}),
			maxDate: jeDate.nowDate(),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM",
			zIndex: 3000,
			isTime: true,
		});
		//月结束
		jeDate("#endMonthDate", {
			isinitVal: true,
			isClear: false,
			initDate: [{
				DD: "-1"
			}, true],
			maxDate: jeDate.nowDate(-1),
			minDate: jeDate.nowDate({
				MM: "-12"
			}),
			maxDate: jeDate.nowDate(),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM",
			zIndex: 3000,
			isTime: true,
		});

	},
	addDate: function(date, days) {
		if (days == undefined || days == '') {
			days = 1;
		}
		var date = new Date(date);
		date.setDate(date.getDate() + days);
		var month = date.getMonth() + 1;
		var day = date.getDate();
		return date.getFullYear() + '-' + electricityReport.getFormatDate(month) + '-' + electricityReport.getFormatDate(day);
	},
	// 日期月份/天的显示，如果是1位数，则在前面加上'0'
	getFormatDate: function(arg) {
		if (arg == undefined || arg == '') {
			return '';
		}

		var re = arg + '';
		if (re.length < 2) {
			re = '0' + re;
		}

		return re;
	},
	reportType: function() {
		$("#reportType").on("change", function() {
			var reportTypeVal = $(this).val();
			if (reportTypeVal == "1") {
				$(".pumpRunCount-search .input-group").hide();
				$(".dayTime").show();
				$('.dateinput').removeClass('dateTime');
				$(".dayTime .dateinput").addClass('dateTime');

			} else {
				if (reportTypeVal == "2") {
					$(".pumpRunCount-search .input-group").hide();
					$(".monthTime").show();
					$('.dateinput').removeClass('dateTime');
					$(".monthTime .dateinput").addClass('dateTime');
				} else if (reportTypeVal == "3") {
					$(".pumpRunCount-search .input-group").hide();
					$(".yearTime").show();
					$('.dateinput').removeClass('dateTime');
					$(".yearTime .dateinput").addClass('dateTime');
				}
			}
		}) */
	},
	calcTableHeight: function() {
		var sc_height = $(".water-tab-content").height();
		return sc_height - 40 - 70 - 44; //表格高度;
	},
	/* initTree: function() {
		var self = this;
		var setting = {
			view: {
				addHoverDom: false,
				removeHoverDom: false,
				selectedMulti: false,
			},
			check: {
				enable: false,
				chkStyle: "radio",
				radioType: "all"
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			edit: {
				enable: false
			},
			callback: {
				onClick: function(event, treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					zTree.checkNode(treeNode, !treeNode.checked, null, true);
				},
				onCheck: function(event, treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					if (treeNode.checked) {
						zTree.selectNode(treeNode);
						self.treeId = treeNode.sid;
					} else {
						zTree.cancelSelectedNode(treeNode);
						self.treeId = "";
					}
				}
			}
		}; */
		// Ter.getApi({
		//     apiname: "SecondSupply/PumpManage/getPumpTree"
		// }, function (res) {
		//     var zNodes = res.Result;
		//     //设备加单选框
		//     for (var i = 0; i < zNodes.length; i++) {
		//         if (zNodes[i].scolum == "AEqu") {
		//             zNodes[i].nocheck = false;
		//         } else {
		//             zNodes[i].nocheck = true;
		//         }
		//     }
		//     if (zNodes.length == 0) return;
		//     var num1_id = zNodes[0].sid;
		//     self.treeId = num1_id;
		//     $.fn.zTree.init($("#treeDemo"), setting, zNodes);
		//     fuzzySearch('treeDemo', '#keywords', '#treesearch', false, true); //初始化模糊搜索方法            
		//     //默认选中第一个
		//     var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
		//     var node = treeObj.getNodeByParam("sid", num1_id);
		//     treeObj.selectNode(node);
		//     treeObj.checkNode(node, true, true);
		//     self.eleReportSearch();
		// });

		/* var zNodes = [{
				id: 0,
				name: "能源管理系统",
				"nocheck": true,
				open: true
			}, {
				id: 1,
				pId: 0,
				name: "气",
				open: true
			},
			{
				id: 101,
				pId: 1,
				name: "天然气"
			},
			{
				id: 102,
				pId: 1,
				name: "煤气"
			},
			{
				id: 104,
				pId: 1,
				name: "氧气"
			},
			{
				id: 2,
				pId: 0,
				name: "水",
				open: true
			},
			{
				id: 201,
				pId: 2,
				name: "原水"
			},
			{
				id: 202,
				pId: 2,
				name: "软水"
			},
			{
				id: 203,
				pId: 2,
				name: "浊环水"
			},
			{
				id: 204,
				pId: 2,
				name: "净环水"
			},

			{
				id: 3,
				pId: 0,
				name: "电",
				open: true
			},
			{
				id: 301,
				pId: 3,
				name: "二級菜單"
			},
			{
				id: 302,
				pId: 3,
				name: "二級菜單"
			},
			{
				id: 303,
				pId: 3,
				name: "二級菜單"
			},
			{
				id: 304,
				pId: 3,
				name: "二級菜單"
			},
			{
				id: 305,
				pId: 3,
				name: "二級菜單"
			}
		];


		// if (zNodes.length == 0) return;
		// var num1_id = zNodes[0].id;
		// self.treeId = num1_id;
		$.fn.zTree.init($("#treeDemo"), setting, zNodes);


	},
	initAreaTree: function() {
		var setting = {
			view: {
				addHoverDom: false,
				removeHoverDom: false,
				selectedMulti: false,
			},
			check: {
				enable: false,
				chkStyle: "radio",
				radioType: "all"
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			edit: {
				enable: false
			},
			callback: {
				onClick: function(event, treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					zTree.checkNode(treeNode, !treeNode.checked, null, true);
				}
			}
		};

		var zNodes = [{
				id: 0,
				name: "能源管理系统",
				"nocheck": true,
				open: true
			}, {
				id: 1,
				pId: 0,
				name: "炼铁厂",
				open: true
			},
			{
				id: 101,
				pId: 1,
				name: "二級菜單"
			},
			{
				id: 102,
				pId: 1,
				name: "二級菜單"
			},
			{
				id: 104,
				pId: 1,
				name: "二級菜單"
			},
			{
				id: 2,
				pId: 0,
				name: "炼钢厂",
				open: true
			},
			{
				id: 201,
				pId: 2,
				name: "二級菜單"
			},
			{
				id: 202,
				pId: 2,
				name: "二級菜單"
			},
			{
				id: 203,
				pId: 2,
				name: "二級菜單"
			},
			{
				id: 204,
				pId: 2,
				name: "二級菜單"
			},
			{
				id: 205,
				pId: 2,
				name: "二級菜單"
			},
			{
				id: 3,
				pId: 0,
				name: "轧钢厂",
				open: true
			},
			{
				id: 301,
				pId: 3,
				name: "二級菜單"
			},
			{
				id: 302,
				pId: 3,
				name: "二級菜單"
			},
			{
				id: 303,
				pId: 3,
				name: "二級菜單"
			},
			{
				id: 304,
				pId: 3,
				name: "二級菜單"
			},
			{
				id: 305,
				pId: 3,
				name: "二級菜單"
			}
		];
		$.fn.zTree.init($("#treeArea"), setting, zNodes);
	}, */
	/* eleReportSearch: function() {
		var self = this;
		if (!self.treeId) {
			layer.alert("请先勾选设备", {
				title: "提示"
			});
			return;
		}
		reportType = $("#reportType").val();
		$(".startDate").each(function() {
			if ($(this).hasClass('dateTime')) {
				startDate = $(this).val();
			}
		})
		$(".endDate").each(function() {
			if ($(this).hasClass('dateTime')) {
				endDate = $(this).val();
			}
		})
		if (Ter.dateCompare(startDate, endDate)) {} else {
			layer.alert("结束时间要大于开始时间", {
				title: "提示"
			});
			return;
		}
		Ter.getApi({
				apiname: "SecondSupply/ReportForm/ElectricReport",
				params: {
					equId: self.treeId,
					reportType: reportType,
					startDate: startDate,
					endDate: endDate
				}
			},
			function(res) {
				//用电量列表
				var instantTable = res.Result.ElectricData;
				//绑定表格
				self.initTable();
				$("#electricitytable").bootstrapTable("load", instantTable);
				//用电量图表               
				var chartXval = [],
					chartYval = [];
				instantTable.forEach(function(value) {
					chartXval.push(value.AcqTime);
					chartYval.push(value.Electric);
				});
				self.chart(chartXval, chartYval);
			}
		);
	}, */
	
	initTable: function() {
		var self = this;
		$("#electricityTable").bootstrapTable({
			//height: self.calcTableHeight(),
			pagination: true,
			pageSize: 10,
			pageList: [5, 10, 15, 20],
			striped: true, //隔行变色
			search: true,                     //是否显示表格搜索，此搜索是客户端搜索，不会进服务端
			strictSearch: false,		  //是否全局匹配,false模糊匹配
			showColumns: true,                  //是否显示所有的列
			showRefresh: true,                  //是否显示刷新按钮
			clickToSelect: false,               //是否启用点击选中行
			showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
			cardView: false,                    //是否显示详细视图
			detailView: false,                  //是否显示父子表
			//导出excel表格设置
			showExport: true,//是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
			exportDataType: "all",              //basic', 'all', 'selected'.
			exportTypes:['excel','xlsx'],	    //导出类型
			exportOptions: {
				//ignoreColumn: [0,0],            //忽略某一列的索引
				fileName: '电报表',              //文件名称设置
				worksheetName: 'Sheet1',          //表格工作区名称
				tableName: '电报表',
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
			onClickRow: function(row, element) { //添加点击行颜色
				$('.click').removeClass('click');
				$(element).addClass('click');
			},
		});
	},
	//加载模态框区域以及下拉框
	LoadModalAreaSelect: function(id) {
		$("#electricArea").empty();
		Ter.getApi({
				apiname: "/region/findByTwoRegion"
			},
			function(res) {
				if(res.result) {
					var select = $("#electricArea");
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
		$("#electricFactory").empty(); //重置下拉框
		var aid = $.trim($('#electricArea option:selected').val()); //获取选中的区域
		var select = $("#electricFactory");
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
		var url = "/EmsReport/findGasByFactoryOrAreaOrTagtype";
		var factoryName = $("#electricArea option:checked").text();
		var branchfactory=$("#electricFactory option:checked").text();
		//var readtime = document.getElementById("startDayDate").value;
		Ter.getApi({
			apiname: url,
		    params: {
				"areaname": factoryName,
				"branchfactory":branchfactory,
				//"readtime" :readtime,
				},
			},
			function(res) {
				if(res.result) {
					console.log(res.result);
					//加载表格
					$("#electricityTable").bootstrapTable('load', res.result);
				}
			});
	},
	chart: function() {
		var electricityChart = echarts.init($('#electricityChart')[0]);
		option = {
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'line' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: ['用电量']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				name: '日期',
				type: 'category',
				data: ['10-19', '10-20', '10-21', '10-22', '10-23', '10-24', '10-25'],
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: [{
				name: '用电量(kw·h)',
				type: 'value'
			}],
			series: [{
				name: '用电量',
				type: 'bar',
				barWidth: '60%',
				data: [820, 932, 901, 934, 1290, 1330, 1320],
				type: 'line'
			}],
		};
		electricityChart.setOption(option, true);
	},
	tabChange: function() {
		$(".ter-tab-head li").on("click", function() {
			var index = $(this).index();
			$(this).addClass("active").siblings().removeClass("active");
			$(".ter-tab-item").eq(index).show().siblings().hide();
			//$("#table").bootstrapTable("resetView");
		});

		$(".tree-head-jz").on("click", function() {
			var index = $(this).index();
			$(this).addClass("tree-hleft").siblings().addClass("tree-hright");
			$(this).removeClass("tree-hright").siblings().addClass("tree-hright");
			$(".ztree").eq(index).show().siblings().hide();
			//$("#table").bootstrapTable("resetView");
		});

	}
}
$(function() {
	electricityReport.init();
})
