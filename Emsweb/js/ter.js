//全局变量Ter
var loadIndex, loadFlag = true;
var load_arr = [];
var prefixStr="Bearer ";
var Ter = {
	server: "http://10.1.11.117:8888/", //(globalConfig.webApiUrl == "" ? window.location.protocol + "//" + window.location.host : globalConfig.webApiUrl) +"/ltswapi/smartwater/"	version: "1.0", //版本号
	userInfo: localStorage.getItem('userInfo') == undefined ? {
		key: ""
	} : JSON.parse(localStorage.getItem('userInfo')),
	author: 'LiTong Water', //开发：
	getApi: function(options, callback) {
		var setting = {
			apiname: '',
			type: 'post',
			params: '',
			async: true,
			contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
			processData: true,
			showLoading: true,
		}
		var opt = $.extend({}, setting, options);
		$.ajax({
			url: Ter.server + opt.apiname,
			type: opt.type,
			dataType: 'json',
			cache: false,
			async: opt.async,
			contentType: opt.contentType,
			processData: opt.processData,
			headers: Ter.base.ajaxHeader,
			data: opt.params,
			beforeSend: function() {
				if(opt.showLoading) {
					load_arr.push("1");
					if(loadFlag) {
						loadIndex = layer.load(3, {
							shade: [0.1, '#fff'], //0.1透明度的白色背景
						});
						loadFlag = false;
					}
				}
			},
			complete: function() {
				if(opt.showLoading) {
					load_arr.pop("1");
					if(load_arr.length == 0) {
						layer.close(loadIndex);
						loadFlag = true;
					}
				}
			},
			success: function(response) {
				try {

					if(response.errCode == "SUCCESS") {
						callback(response);
					} else {
						if(response.errCode == 'KEY_Forbidden' || response.errCode == 'KEY_Invalid') {
							Ter.goLogin(response.errMsg);
						} else {
							layer.alert(response.errMsg, {
								title: '提示'
							});
						}
					}
				} catch(err) {
					if(opt.showLoading) {
						load_arr.pop("1");
						if(load_arr.length == 0) {
							layer.close(loadIndex);
							loadFlag = true;
						}
					}
				}
			},
			error: function(jqXHR, textStatus) {
				var t_index = layer.alert(jqXHR.responseText, {
					title: '提示'
				});
			},
		});
	},
	tableApi: function(tableId, options, callback) {
		var setting = {
			showLoading: true,
			striped: true, //隔行变色
			method: 'POST',
			contentType: "application/x-www-form-urlencoded", //发送到服务起的数据编码类型
			cache: false,
			pageNumber: 1, //默认加载第一页
			pagination: true,
			formatLoadingMessage: function() {
				return "正在加载,请稍候...";
			},
			ajaxOptions: {
				headers: Ter.base.ajaxHeader,
				beforeSend: function() {
					if(setting.showLoading) {
						load_arr.push("1");
						if(loadFlag) {
							loadIndex = layer.load(3, {
								shade: [0.1, '#fff'], //0.1透明度的白色背景
							});
							loadFlag = false;
						}
					}
				},
				complete: function() {
					if(setting.showLoading) {
						load_arr.pop("1");
						if(load_arr.length == 0) {
							layer.close(loadIndex);
							loadFlag = true;
						}
					}
				},
				error: function(jqXHR, textStatus) {
					var t_index = layer.alert(jqXHR.responseText, {
						title: '提示'
					});
					setTimeout(function() {
						layer.close(t_index);
					}, 1500);
				},
			},
			sidePagination: "client",
			pagination: true,
			pageSize: 10, //单页记录数
			pageList: [50, 30, 10], //分页步进值
			responseHandler: function(res) {

				if(res.errCode == "SUCCESS") {
					return {
						total: res.result.total, //总页数,前面的key必须为"total"
						rows: res.result.rows //行数据，前面的key要与之前设置的dataField的值一致.
					};
				} else {
					if(res.errCode == 'KEY_Forbidden' || res.errCode == 'KEY_Invalid') {
						Ter.goLogin(res.errMsg);
					} else {
						layer.alert(res.errMsg, {
							title: '提示'
						});
					}
					return {
						total: 0,
						rows: []
					}
				}
			},
			//onLoadError: function (status, res) {
			//    layer.alert("接口请求失败", { title: '提示' });
			//},
			onClickRow: function(row, element) { //添加点击行颜色
				$('.click').removeClass('click');
				$(element).addClass('click');
			},
		}
		var opt = $.extend({}, setting, options);
		$('#' + tableId).bootstrapTable(opt);
	},
	//检查表单是否为空
	checkForm: function(form) {
		var arr = $("#" + form + " .require");
		for(var j = 0; j < arr.length; j++) {
			if(arr[j].value.trim() == "") {
				arr[j].focus();
				arr[j].setAttribute("placeholder", "该项不能为空");
				return false;
			}
		}
		return true;
	},
	postData: function(form) {
		var a = $("#" + form).serializeArray();
		var o = {};
		$.each(a, function() {
			if(o[this.name]) {
				if(!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	},
	formAssign: function(form, data) {
		for(var key in data) {
			$("#" + form + " [name=" + key + "]").val(data[key]);
		}
	},
	getUrlParam: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if(r != null) {
			return unescape(r[2]);
		}
		return null;
	},
	dateCompare: function(startTime, endTime) { //判断结束日期是否大于开始日期
		startTime = startTime.replace(/-/g, "/");
		endTime = endTime.replace(/-/g, "/");
		var endTime1 = new Date(Date.parse(endTime));
		var startTime1 = new Date(Date.parse(startTime));
		if(startTime1 > endTime1) {
			return false;
		} else {
			return true
		}
	},
	differDay: function(startDate, endDate) { //两个日期相差天数
		var startTime = new Date(startDate.replace(/-/g, "/"));
		var endTime = new Date(endDate.replace(/-/g, "/"));
		var days = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24);
		return days;
	},
	textareaVal: function(text) {
		var t_val = $("#" + text).val();
		t_val = t_val.replace(/(\r\n)|(\n)/g, '<br>'); //用<br>替换掉回车和换行
		var val_arr = t_val.split("<br>"); //转化为数组
		var res_arr = val_arr.filter(function(val, index) { //数组去空
			return val !== "";
		});
		return res_arr;
	},
	//目录树折叠收起面板
	treeToggle: function(table) {
		if(table) {
			$('#' + table).bootstrapTable('resetView');
		}
		if($(".tree-wrapper").hasClass("treeCollapse")) {
			$(".page-container").addClass("hasTree");
			$(".tree-wrapper").removeClass("treeCollapse");
			$(".tree-head").show();
		} else {
			$(".tree-head").hide();
			$(".page-container").removeClass("hasTree");
			$(".tree-wrapper").addClass("treeCollapse");
		}
	},
	goLogin: function(errMsg) {
		if(!window.parent._mainFun.tokenInvalid) {
			window.parent._mainFun.tokenInvalid = true;
			layer.alert('您的登录已过期，请重新登录系统！', {
				title: '提示'
			});
			setTimeout(function() {
				parent.location.href = "/login.aspx";
			}, 1500);
		}
	}
};
Ter.base = {
	ajaxHeader: {
		Authorization: prefixStr+Ter.userInfo.token,
		Source: 'web'
	},
};