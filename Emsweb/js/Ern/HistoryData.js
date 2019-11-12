var reportType, startDate, GroupType, endDate;
var Erhistory = {
	init: function() {
		this.initDate();
		this.GroupType();
		this.eleReportSearch();
		//this.LoadMedia();
		
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
	
	//查询
	eleReportSearch: function() {
		var self = this;
	
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
	
	
	//按照介质来读取一级菜单获取一级菜单下的所有二级菜单
	/* LoadMedia: function() {

		var pid = this.getQueryString("type"); //获取一级介质ID
		console.log(2);//2改为pid
		Ter.getApi({
				apiname: '/Media/findByPidMedia',
				params: {
					"pid": pid
				}
			},
			function(res) {
				console.log(res);
				if (res.result) {
					var select = $("#WaterType");
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
	} */




















}
$(function(){
	Erhistory.init();
})
