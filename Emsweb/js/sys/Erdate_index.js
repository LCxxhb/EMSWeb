var menuPage = {
	init: function() {
		menuPage.loadTable(); //加载table
		menuPage.calcTableHeight();
		menuPage.initDate();
		this.GroupType();
		//menuPage.eleReportSearch();
	},
	//jedate
	initDate: function() {
		//小时开始
		jeDate("#startHourDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: [{
				hh: "-1"
			}, true],
			maxDate: jeDate.nowDate(),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD hh",
			zIndex: 3000,
			isTime: true,
			// donefun:function(obj) {
			// 	$("#endHourDate").val();
			// }, 
		});
		//小时结束
		jeDate("#endHourDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD hh",
			zIndex: 3000,
			isTime: true,
		});
		//班组开始
		jeDate("#startGroupDate", {

			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: [{
				hh: "-12"
			}, true],
			maxDate: jeDate.nowDate(+365),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD hh:zz",
			zIndex: 3000,
			isTime: true,
		});
		//班组结束
		jeDate("#endGroupDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD hh:zz",
			zIndex: 3000,
			isTime: true,
		});
		//日开始
		jeDate("#startDayDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: [{
				DD: "-1"
			}, true],
			maxDate: jeDate.nowDate(+365),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			isTime: true,
		});
		//日结束
		jeDate("#endDayDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(+365),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			isTime: true,
		});
		//周开始
		jeDate("#startWeekDate", {

			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: [{
				DD: "-7"
			}, true],
			maxDate: jeDate.nowDate(+365),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			isTime: true,
		});
		//周结束
		jeDate("#endWeekDate", {

			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(+365),
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
			shortcut: [{
					name: "一个月",
					val: {
						DD: 30
					}
				},
				{
					name: "二个月",
					val: {
						MM: 2
					}
				},
				{
					name: "三个月",
					val: {
						MM: 3
					}
				},
				{
					name: "一年",
					val: {
						DD: 365
					}
				}
			],
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

			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(+365 * 2),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM",
			zIndex: 3000,
			isTime: true,
		});
		//季度开始
		jeDate("#startSeasonDate", {
			shortcut: [{
					name: "一季度",
					val: {
						MM: 3
					}
				},
				{
					name: "二个季度",
					val: {
						MM: 6
					}
				},
				{
					name: "三个季度",
					val: {
						MM: 9
					}
				},
				{
					name: "四个季度",
					val: {
						MM: 12
					}
				},
			],
			isinitVal: true,
			isClear: false,
			initDate: [{
				MM: "-3"
			}, true],
			maxDate: jeDate.nowDate(-1),
			minDate: jeDate.nowDate({
				MM: "-12"
			}),
			maxDate: jeDate.nowDate({
				MM: "+12"
			}),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM",
			zIndex: 3000,
			isTime: true,
		});
		//季度结束
		jeDate("#endSeasonDate", {
			shortcut: [{
					name: "一季度",
					val: {
						MM: 3
					}
				},
				{
					name: "二个季度",
					val: {
						MM: 6
					}
				},
				{
					name: "三个季度",
					val: {
						MM: 9
					}
				},
				{
					name: "四个季度",
					val: {
						MM: 12
					}
				},
			],
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(-1),
			minDate: jeDate.nowDate({
				MM: "-12"
			}),
			maxDate: jeDate.nowDate({
				MM: "+12"
			}),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM",
			zIndex: 3000,
			isTime: true,
		});


		// 模态框 日开始
		jeDate("#planStartDayDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(+60),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			isTime: true,
		});
		//日结束
		jeDate("#planEndDayDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(+60),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
			isTime: true,
		});

	},
	changeType: function() {

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
	},

	//班组类型
	GroupType: function() {
		var type = $("#GroupType").val();
		if (type == 2) {
			//小时
			$(".datehour").show().siblings().hide();

		} else if (type == 3) {
			//班组

			$(".dategroup").show().siblings().hide();
		} else if (type == 4) {
			//日
			$(".dateday").show().siblings().hide();
		} else if (type == 5) {
			//周
			$(".dateweek").show().siblings().hide();
		} else if (type == 6) {
			//月报表
			$(".datemonth").show().siblings().hide();
		} else if (type == 7) {
			//季度
			$(".dateseason").show().siblings().hide();
		}
	},

	loadTable: function() {
		var self = this;
		$("#table").bootstrapTable({
			height: self.calcTableHeight(),
			striped: true, //隔行变色
			columns: [{
				field: 'ErQu',
				title: '区域',
				align: 'center',
			}, {
				field: 'ErFen',
				title: '分厂  ',
				align: 'center',
			}, {
				field: 'Ercai',
				title: '采集点',
				align: 'center',
			}, {
				field: 'EeType',
				title: '介质类型',
				align: 'center',
			}, {
				field: 'ErShun',
				title: '瞬时值',
				align: 'center',
			}, {
				field: 'ErTime',
				title: '时间',
				align: 'center',
			}, {
				field: 'ErMax',
				title: '最大值',
				align: 'center',
			}, {
				field: 'ErMin',
				title: '最小值',
				align: 'center',
			}, {
				field: 'ErAVG',
				title: '平均值',
				align: 'center',
			}, {
				field: 'ErLei',
				title: '累计值',
				align: 'center',
			}],
			data: [{
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
				}, {
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
					Ercai: '123',
					EeType: '456',
					ErShun: '789',
					ErTime: '2019-10-25',
					ErMax: '915',
					ErMin: '522',
					ErLei: '854',
					ErAVG: '436'
				}
			],
			onClickRow: function(row, element) { //添加点击行颜色
				$('.click').removeClass('click');
				$(element).addClass('click');
			},
		});
	},
	calcTableHeight: function() {
		var sc_height = $(".water-tab-content").height();
		return sc_height - 40 - 70 - 44; //表格高度;
	},
	//加载菜单table数据
	loadTableData: function() {
		var url = "/menu/findAll";
		Ter.getApi({
				apiname: url,
			},
			function(res) {
				if (res.result) {
					//加载表格
					$("#planTable").bootstrapTable('load', res.result);
				}
			})
	},

	//加载模态框下拉框
	LoadModalMenuSelect: function(id) {
		$("#parentMenu").empty();
		Ter.getApi({
				apiname: "/menu/findParentMenu"
			},
			function(res) {
				if (res.result) {
					var select = $("#parentMenu");
					for (var i = 0; i < res.result.length; i++) {
						if (id == res.result[i].id) {
							select.append("<option value='" + res.result[i].id + "' selected='selected'>" +
								res.result[i].menuname + "</option>");
						} else {
							select.append("<option value='" + res.result[i].id + "'>" +
								res.result[i].menuname + "</option>");
						}
					}
				}
			})
	},

	//菜单添加、编辑
	btnEdit: function(parm) {
		if (parm == 0) {
			$("#planModal").modal("show");
			$('#menuname').val('');
			$('#menuurl').val('');
			$('#id').val('');
			this.LoadModalMenuSelect("");
		} else {
			var rows = $('#planTable').bootstrapTable('getSelections');
			if (rows.length != 1) {
				layer.alert("请选择一条数据进行编辑！")
				return;
			}
			console.log(rows[0])
			//会显选中的用户信息
			$("#planModal").modal("show");
			$('#menuname').val(rows[0].menuname);
			$('#menuurl').val(rows[0].munuurl);
			$('#id').val(rows[0].id);
			this.LoadModalMenuSelect(rows[0].pid);
		}

	},

	//添加编辑数据方法 提交表单
	btnOk: function() {
		var pid = $.trim($('#parentMenu option:selected').val());
		var id = $('#id').val();
		var menuname = $('#menuname').val();
		var munuurl = $('#menuurl').val();
		var url;
		if (id == null || id == undefined || id == "") { //菜单添加
			url = '/menu/insert';
			var menu = {
				"pid": pid,
				"menuname": menuname,
				"munuurl": munuurl
			}
		} else {
			url = '/menu/update';
			var menu = {
				"pid": pid,
				"id": id,
				"menuname": menuname,
				"munuurl": munuurl
			}
		}
		Ter.getApi({
				apiname: url,
				params: menu
			},
			function(res) {
				if (res.errCode == "SUCCESS") {
					layer.alert(res.errMsg);
					$('#planModal').modal('hide');
					menuPage.loadTableData();
				}

			})
	},

	//实现菜单删除的方法
	btnDelete: function() {
		var ids = ""; //得到菜单选择的数据的ID
		var rows = $('#planTable').bootstrapTable('getSelections');
		if (rows.length == 0) {
			layer.alert("请选择要删除的数据！")
			return;
		}

		layer.confirm("确认要删除？", {
				btn: ['确定', '取消'],
				title: "提示"
			},
			function() {
				for (var i = 0; i < rows.length; i++) {
					ids += rows[i].id + ',';
				}
				ids = ids.substring(0, ids.length - 1);
				var dataStr = {
					"id": ids
				};
				Ter.getApi({
						apiname: '/menu/delete',
						params: dataStr
					},
					function(res) {
						if (res.errCode == "SUCCESS") {
							layer.alert(res.errMsg)
							menuPage.loadTableData();
						}
					})
			}
		)
	},
	// 查詢
	eleReportSearch: function() {
		var self = this;

		GroupType = $("#GroupType").val();

		if (GroupType == 2) {
			$("#startHourDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					startDate = $(this).val();
					startDate=startDate+":00";
				}
			})
			$("#endHourDate").each(function() {
				if ($(this).hasClass('dateTime')) {
					endDate = $(this).val();
					endDate=endDate+":00";
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
		}else if (GroupType == 5) {
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
		}else if (GroupType == 6) {
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
		}else if (GroupType == 7) {
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
		}else{
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


	}
}
$(function() {
	menuPage.init();
});
/**用电量报表**/
var reportType, startDate, GroupType, endDate;
var electricityReport = {
	init: function() {
		//this.initDate();
		this.initTree();
		this.initAreaTree();
		//this.reportType();
		//this.initTable();

		this.chart();
		this.tabChange();
		//this.calcTableHeight();
	},

	//报表类型方法
	/* reportType: function() {
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
		})
	}, */
	//班组类型方法
	/* GroupType:function(){
		
	}, */
	/* calcTableHeight: function() {
		var sc_height = $(".water-tab-content").height();
		return sc_height - 40 - 70 - 44; //表格高度;
	}, */
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
		};
		//按能源介质分类
		var zNodes = [{
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
	//介质单位分类
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
		//按介质单位分
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
	},
	// eleReportSearch: function() {
	// 	alert(123);
	// 	var self = this;
	// 	GroupType = $("#GroupType").val();
	// 	$(".startDate").each(function() {
	// 		if ($(this).hasClass('dateTime')) {
	// 			startDate = $(this).val();
	// 		}
	// 	})
	// 	$(".endDate").each(function() {
	// 		if ($(this).hasClass('dateTime')) {
	// 			endDate = $(this).val();
	// 		}
	// 	})
	// 	if (Ter.dateCompare(startDate, endDate)) {} else {
	// 		layer.alert("结束时间要大于开始时间", {
	// 			title: "提示"
	// 		});
	// 		return;
	// 	}
	// Ter.getApi({
	// 		apiname: "SecondSupply/ReportForm/ElectricReport",
	// 		params: {
	// 			equId: self.treeId,
	// 			GroupType: GroupType,
	// 			startDate: startDate,
	// 			endDate: endDate
	// 		}
	// 	},
	// 	function(res) {
	// 		//用电量列表
	// 		var instantTable = res.Result.ElectricData;
	// 		//绑定表格
	// 		self.initTable();
	// 		$("#table").bootstrapTable("load", instantTable);
	// 		//用电量图表               
	// 		var chartXval = [],
	// 			chartYval = [];
	// 		instantTable.forEach(function(value) {
	// 			chartXval.push(value.AcqTime);
	// 			chartYval.push(value.Electric);
	// 		});
	// 		self.chart(chartXval, chartYval);
	// 	}
	// );
	// },

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
					saveAsImage: {}
				}
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
