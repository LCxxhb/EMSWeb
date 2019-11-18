var startDate, GroupType, endDate;
var ErDate = {
	init: function() {
		//加载方法类
		this.LoadMedia();
		this.loadTable(); //加载table
		this.calcTableHeight();
		//this.initDate();
		/* this.GroupType(); */
		this.getFactory();
		//this.loadMedia();
		this.initTree();
		this.initAreaTree();
		this.chart();
		this.tabChange();
		this.findAllData();
		//ErDate.eleReportSearch();
	},
	// 介质下拉框 数据(与后台接口绑定)
	/* loadMedia: function() {
		Ter.getApi({
				apiname: "/Media/findByTwoMedia"
			},
			function(res) {
				if (res.result) {
					for (var i = 0; i < res.result.length; i++) {
						$("#jzType").append("<option value='" + res.result[i].id + "'>" +
							res.result[i].mediaName + "</option>");

					}
				}
			})

	}, */
	//分厂下拉框 数据(与后台接口绑定)
	getFactory: function() {
		Ter.getApi({
				apiname: '/region/findByTwoRegion',
				params: {
					"pid": 2
				}
			},
			function(res) {
				if (res.result) {
					$("#ErFactory").append("<option value='0'>-请选择-</option>");
					for (var i = 0; i < res.result.length; i++) {
						$("#ErFactory").append("<option value='" + res.result[i].aid + "'>" +
							res.result[i].aname + "</option>");
					}

				}
			})
	},


	//区域拉框 数据(与后台接口绑定)
	getArea: function(nodeId) {
		$("#ErArea").empty(); //重置下拉框
		var aid = $.trim($('#ErFactory').val()); //获取选中的分厂
		if (aid == 0) {
			layer.alert('请选择分厂!');
		}
		Ter.getApi({
				apiname: '/region/findByPid',
				params: {
					"pid": aid
				}
			},
			function(res) {
				if (res.result) {
					$("#ErArea").append("<option value='0'>-请选择-</option>");
					for (var i = 0; i < res.result.length; i++) {
						if (nodeId == "" || nodeId == "undefind") {
							$("#ErArea").append("<option value='" + res.result[i].aid + "'>" +
								res.result[i].aname + "</option>");
						} else {
							if (nodeId == res.result[i].aid) {
								$("#ErArea").append("<option value='" + res.result[i].aid + "' selected='selected'>" +
									res.result[i].aname + "</option>");
							} else {
								$("#ErArea").append("<option value='" + res.result[i].aid + "'>" +
									res.result[i].aname + "</option>");
							}
						}
					}
				}
			})
	},

	//jedate时间
	/* initDate: function() {
		jeDate("#startDayDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: [{
				DD: "-1"
			}, true],
			 minDate:"1900-01-01 00:00:00",   //最小日期 或者 "1900-01-01" 或者 "10:30:25"
			 maxDate:"2099-12-31 23:59:59",  //最大日期 或者 "2099-12-31" 或者 "16:35:25"
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD hh:mm:ss",
			zIndex: 3000,
			isTime: true,
		});
		//日结束
		jeDate("#endDayDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			minDate:"1900-01-01 00:00:00",   //最小日期 或者 "1900-01-01" 或者 "10:30:25"
			maxDate:"2099-12-31 23:59:59",  //最大日期 或者 "2099-12-31" 或者 "16:35:25"
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD hh:mm:ss",
			zIndex: 3000,
			isTime: true,
		});
	}, */

	//报表类型：changeType
	/* changeType: function() {

		var type = $("#reportType").val();
		if (type == 3) {
			// 日报表
			$(".dateday").show();
			$(".datemonth").hide();
			$(".dateyear").hide();

		} else if (type == 2) {
			//月报表

			$(".datemonth").show();
			$(".dateyear").hide();
			$(".dateday").hide();
		}
	}, */
	//表格：数据列表
	loadTable: function() {

		var self = this;
		$("#table").bootstrapTable({
			height: self.calcTableHeight(),
			pagination: true, //是否显示分页（*）
			pageSize: 20,
			striped: true, //隔行变色
			sidePagination: 'client', //server:服务器端分页|client：前端分页
			pageNumber: 1, //默认加载第一页
			showExport: true, //是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
			exportDataType: "all", //basic', 'all', 'selected'.
			exportTypes: ['excel', 'xlsx'], //导出类型
			//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
			exportOptions: {
				//ignoreColumn: [0,0],            //忽略某一列的索引
				fileName: '介质数据表', //文件名称设置
				worksheetName: 'Sheet1', //表格工作区名称
				tableName: '介质数据表',
				excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
			},
			columns: [{
				checkbox: true,
				visible: true
			}, {

				field: 'tagType',
				title: '介质名称',
				align: 'center',
			}, {
				field: 'bRANCHFACTORY',
				title: '区域',
				align: 'center',
			}, {
				field: 'aREANAME',
				title: '分厂  ',
				align: 'center',
			}, {
				field: 'collectionPoint',
				title: '采集点',
				align: 'center',
			}, {
				field: 'dataType',
				title: '介质类型',
				align: 'center',
			}, {
				field: 'tagVal',
				title: '瞬时值',
				align: 'center',
			}, {
				field: 'readTime',
				title: '时间',
				align: 'center',
			}, {
				field: 'max',
				title: '最大值',
				align: 'center',
			}, {
				field: 'min',
				title: '最小值',
				align: 'center',
			}, {
				field: 'ave',
				title: '平均值',
				align: 'center',
			}, {
				field: 'description',
				title: '备注类型',
				align: 'center',
			}, {
				field: 'sum',
				title: '累计值',
				align: 'center',
			}],
			/* data: [{
					ErQu: '龙成',
					ErFen: '炼铁厂',
					Ercai: '123',
					EeType: '456',
					ErShun: '789',
					ErTime: '2019-10-25',
					ErMax: '915',
					ErMin: '522',
					ErLei: '854',
					ErAVG: '436'
				},
				{
					ErQu: '龙成',
					ErFen: '炼铁厂',
					Ercai: '989 ',
					EeType: '456',
					ErShun: '789',
					ErTime: '2019-10-25',
					ErMax: '915',
					ErMin: '522',
					ErLei: '854',
					ErAVG: '436'
				}
			], */
			onClickRow: function(row, element) { //添加点击行颜色
				$('.click').removeClass('click');
				$(element).addClass('click');
			},

		});
		//this.loadTableData();

	},

	calcTableHeight: function() {
		var sc_height = $(".water-tab-content").height();
		return sc_height - 40 - 70 - 44; //表格高度;
	},
	//加载菜单table数据
	loadTableData: function() {
		var url = '/gas/history';
		Ter.getApi({
				apiname: url,
				params: {
					"param1": "轧钢厂",
					"param3": "氧气"
				}
			},
			function(res) {
				if (res.result) {
					//加载表格
					$("#table").bootstrapTable('load', res.result);
				}
			})
	},
	//初始化查询所有数据
	findAllData: function() {
		var type = this.getQueryString("type");
		var url;
		if (type == 1) {
			url = "water/findAll";
		} else if (type == 2) {
			url = "";
		} else if (type == 3) {
			url = "gas/findAll";
		}
		Ter.getApi({
				apiname: url
			},
			function(res) {
				if (res.result) {
					console.log(res.result);
					//加载表格
					$("#table").bootstrapTable('load', res.result);
				}
			})

	},
	// 查詢
	eleReportSearch: function() {
		var type = this.getQueryString("type");
		alert("type====>" + type)
		var url;
		var self = this;
		//气体
		//获取查询条件
		var jzType = $("#jzType option:selected").text(); //介质下拉框的文本值
		//var jzType = $("#jzType").val(); //介质下拉框的value值
		var ErFactory = $("#ErFactory option:selected").text(); //分厂
		var ErArea = $("#ErArea option:selected").text(); //区域
		var startDayDate = $("#startDayDate").val(); //开始时间
		var endDayDate = $("#endDayDate").val(); //结束时间


		//把查询条件放入参数对象
		var params = {
			"areaname": ErFactory, //Parma1;分厂名
			"tagtype": jzType, //介质
			"factory": ErArea, //区域
			//"param4": startDayDate, //开始时间
			//"param5": endDayDate, //结束时间
		};
		//根据type调用不同接口1表示水2表示电3表示气
		if ("1" == type)
			//调用接口
			url = "water/findAllTagtype";
		else if ("2" == type)
			url = "";
		else if ("3" == type)
			url = "gas/findAllTagtype";
		//alert("url=====>"+url)

		//调用接口
		/* var url = "gas/history"; */

		//接口 返回值绑定表格
		Ter.getApi({
				apiname: url,
				params: params
			},
			function(res) {
				if (res.result) {
					console.log(res.result);
					//加载表格
					$("#table").bootstrapTable('load', res.result);
				}
			})




		//时间判断
		GroupType = $("#GroupType").val();

		if (GroupType == 2) {
			$("#startHourDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					startDate = $(this).val();
					startDate = startDate + ":00";
				}
			})
			$("#endHourDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					endDate = $(this).val();
					endDate = endDate + ":00";
				}
			})
		} else if (GroupType == 3) {

			$("#startGroupDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					startDate = $(this).val();
				}
			})
			$("#endGroupDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					endDate = $(this).val();
				}
			})



		} else if (GroupType == 4) {
			$("#startDayDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					startDate = $(this).val();
				}
			})
			$("#endDayDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					endDate = $(this).val();
				}
			})
		} else if (GroupType == 5) {
			$("#startWeekDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					startDate = $(this).val();
				}
			})
			$("#endWeekDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					endDate = $(this).val();
				}
			})
		} else if (GroupType == 6) {
			$("#startMonthDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					startDate = $(this).val();
				}
			})
			$("#endMonthDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					endDate = $(this).val();
				}
			})
		} else if (GroupType == 7) {
			$("#startSeasonDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					startDate = $(this).val();
				}
			})
			$("#endSeasonDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					endDate = $(this).val();
				}
			})
		} else {
			$("#startDayDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					startDate = $(this).val();
				}
			})
			$("#endDayDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					endDate = $(this).val();
				}
			})
		}

		console.log(startDate);
		if (Ter.dateCompare(startDate, endDate)) {} else {
			layer.alert("结束时间要大于开始时间", {
				title: "提示"
			});
			return;
		}


	},

	//左侧菜单栏：介质树状图
	initTree: function() {
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
					enable: true,
					idKey: "id",
					pIdKey: "pid",
					rootPId: 0
				},
				key: {
					name: "mediaName"
				}
			},
			edit: {
				enable: false
			},
			callback: {
				onClick: function(event, treeId, treeNode) {
					// var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					// zTree.checkNode(treeNode, !treeNode.checked, null, true);

					console.log(treeNode.id);
					var nodeId = treeNode.id;
					$("#jzType").val(nodeId);

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
		};

		//按能源介质分类
		var zNodes = [];
		Ter.getApi({
			apiname: "/Media/findAllMedia"
		}, function(res) {
			zNodes = res.result;
			console.log(zNodes);
			if (zNodes.length == 0) return;
			var num1_id = zNodes[0].id;
			self.treeId = num1_id;
			$.fn.zTree.init($("#treeDemo"), setting, zNodes);

		});


	},
	//区域单位分类
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
					enable: true,
					idKey: "aid",
					pIdKey: "pid",
					rootPId: 0
				},
				key: {
					name: "aname"
				}
			},
			edit: {
				enable: false
			},
			callback: {
				onClick: function(event, treeId, treeNode) {
					// var zTree = $.fn.zTree.getZTreeObj("treeDemo");
					// zTree.checkNode(treeNode, !treeNode.checked, null, true);

					var nodeId = treeNode.aid;
					console.log(nodeId);

					if (treeNode.pid == 2) {
						//$("#ErFactory option").removeAttr("selected"); //移除属性selected
						//$("#ErFactory").find("option:contains('"+nodeName+"')").attr("selected", true);
						$("#ErFactory").val(nodeId);
						ErDate.getArea();

					} else if (treeNode.pid != 2 && treeNode.pid != 0) {
						//$("#ErArea").find("option:contains('" + nodeName + "')").attr("selected", true);
						$("#ErFactory").val(treeNode.pid);
						ErDate.getArea(nodeId);
						//$("#ErArea").val(nodeId);
					}

				}
			}
		};
		//按区域分
		var zNodes = [];
		Ter.getApi({
			apiname: "/region/findAllRegion"
		}, function(res) {
			zNodes = res.result;
			console.log(zNodes);
			if (zNodes.length == 0) return;
			var num1_id = zNodes[0].id;
			self.treeId = num1_id;
			$.fn.zTree.init($("#treeArea"), setting, zNodes);

		});
	},
	//折线图
	chart: function() {
		var electricityChart = echarts.init($('#electricityChart')[0]);
		option = {
			title: {
				text: '能源数据表'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					label: {
						backgroundColor: '#6a7985'
					}
				}
			},
			legend: {
				data: ['氧气含量', '煤气含量', '氮气含量', '净水', '浊环水']
			},
			toolbox: {
				feature: {
					dataZoom: {
						yAxisIndex: 'none'
					},
					restore: {},
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			dataZoom: [{
					// 这个dataZoom组件，默认控制x轴。
					type: 'slider', // 这个 dataZoom 组件是 slider 型 dataZoom 组件
					xAxisIndex: 0,
					start: 10, // 左边在 10% 的位置。
					end: 60 // 右边在 60% 的位置。
				},
				{
					type: 'inside',
					xAxisIndex: 0,
					start: 10,
					end: 60
				},
				{
					type: 'slider',
					yAxisIndex: 0,
					start: 30,
					end: 80
				},
				{
					type: 'inside',
					yAxisIndex: 0,
					start: 30,
					end: 80
				}
			],
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: ['2019/11/11', '2019/11/12', '2019/11/13', '2019/11/14', '2019/11/15', '2019/11/16', '2019/11/17']
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
					name: '氧气含量',
					type: 'line',
					stack: '总量',
					areaStyle: {},
					data: [120, 132, 101, 134, 90, 230, 210]
				},
				{
					name: '煤气含量',
					type: 'line',
					stack: '总量',
					areaStyle: {},
					data: [220, 182, 191, 234, 290, 330, 310]
				},
				{
					name: '氮气含量',
					type: 'line',
					stack: '总量',
					areaStyle: {},
					data: [150, 232, 201, 154, 190, 330, 410]
				},
				{
					name: '净水',
					type: 'line',
					stack: '总量',
					areaStyle: {
						normal: {}
					},
					data: [320, 332, 301, 334, 390, 330, 320]
				},
				{
					name: '浊环水',
					type: 'line',
					stack: '总量',
					label: {
						normal: {
							show: true,
							position: 'top'
						}
					},
					areaStyle: {
						normal: {}
					},
					data: [820, 932, 901, 934, 1290, 1330, 1320]
				}
			]
		};

		window.onresize = electricityChart.resize;
		$("#electricityChart").resize(electricityChart.resize);
		electricityChart.setOption(option, true);
	},

	//菜单切换栏	
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

	},

	//按照介质来读取一级菜单获取一级菜单下的所有二级菜单
	LoadMedia: function() {

		var pid = this.getQueryString("type"); //获取一级介质ID
		//console.log(pid); 
		Ter.getApi({
				apiname: '/Media/findByPidMedia',
				params: {
					"pid": pid
				}
			},
			function(res) {
				console.log(res);
				if (res.result) {
					var select = $("#jzType");
					select.append("<option value=''>-请选择-</option>");
					for (var i = 0; i < res.result.length; i++) {

						select.append("<option value='" + res.result[i].id + "'>" +
							res.result[i].mediaName + "</option>");
					}
				}
			})
	},
	getQueryString: function(name) {
		const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		const urlObj = window.location;
		var r = urlObj.href.indexOf('#') > -1 ? urlObj.hash.split("?")[1].match(reg) : urlObj.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);
		return null;
	}

}

$(function() {
	ErDate.init();
	//electricityReport.init();
});
