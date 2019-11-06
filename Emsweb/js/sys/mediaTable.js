var mediaTable = {
	init: function() {
		//mediaTable.loadTable(); //加载table
		mediaTable.initDate();
		mediaTable.loadSlect();
	},
   
   initDate: function() {
		//日开始
		jeDate("#startDayDate", {
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
		jeDate("#endDayDate", {
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
		//月开始
		jeDate("#startMonthDate", {
			isinitVal: true,
			isClear: false,
			initDate:jeDate.nowDate(),
			maxDate: jeDate.nowDate({
				MM: "+12"
			}),
			minDate: jeDate.nowDate({
				MM: "-12"
			}),
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
			initDate:jeDate.nowDate(),
			maxDate: jeDate.nowDate({
				MM: "+12"
			}),
			minDate: jeDate.nowDate({
				MM: "-12"
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
    changeType:function(){
    	
    	var type= $("#reportType").val();
    	
    	if(type==1)
    	{
    		// 日报表
    		$(".dateday").show();
    		$(".datemonth").hide();
    		$(".dateyear").hide();
    		
    	}else if(type==2){
    		//月报表
    	$(".dateday").hide();
    		$(".datemonth").show();
    		$(".dateyear").hide();
    	}
    },
    
	/*loadTable: function() {
		$('#planTable').bootstrapTable({
			pagination: true, //是否显示分页（*）
			striped: true, //隔行变色
			columns: [{
					checkbox: true,
					visible: true
				}, {
					field: 'id',
					title: '序号'
				},{
					field: 'startTime',//20190910
					title: '开始时间'
				}, {
					field: 'endTime',
					title: '结束时间'
				}, {
					field: 'factoryMenu',
					title: '分厂'
				},{
					field: 'area',
					title: '区域'
				},{
					field: 'mediaName',
					title: '一级介质'
				}, {
					field: 'mediaName2',
					title: '二级介质'
				}, {
					field: 'planNumber',
					title: '计划数量'
				}, {
					field: 'planUseTotal',
					title: '计划消耗总量'
				}, {
					field: 'planOutputTotal',
					title: '计划产出总量'
				}, {
					field: 'createBy',
					title: '创建人'
				}, {
					field: 'createDate',
					title: '创建时间'
				}
			]
		});
		this.loadTableData();
	},*/
	
	//查看所有数据 
	loadTableData: function() {
		var url="/plan/findAll";
		Ter.getApi({
				apiname: url,
			},
			function(res) {
				if(res.result) {
					console.log(res.result);
					//加载表格
					$("#planTable").bootstrapTable('load', res.result);
				}
			})
	},
		//加载模态框介质下拉框
	LoadModalMediaSelect: function(id) {
		$("#mediaName").empty();
		Ter.getApi({
				apiname: "/Media/findAllMedia"
			},
			function(res) {
				if(res.result) {
					var select = $("#mediaName");
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
	
	
	
	//copy朱玲待修改
	/*loadSelect: function () {
    $.ajax({
        method: "post",
        url: 'http://10.1.11.112:8888/Media/findByOneMedia',
        dataType: "json",
        async: true,
        success: function (res) {
            var result = res.result;
            var str = '<option value="">--请选择--</option>';
            for (var i = 0; i < result.length; i++) {
                str += '<option value=' + result[i].id + '>' + result[i].mediaName + '</option>';
            }
            $("#mediaOne").html(str);
        }
    });

    $("#mediaOne").change(function () {
        var pid = $("#mediaOne").val();
        $.ajax({
            method: "post",
            dataType: "json",
            url: 'http://10.1.11.112:8888/Media/findByPidMedia',
            data: {
                pid: pid
            },
            success: function (result1) {
                var res = result1.result;
                var str = '';
                for (var i = 0; i < res.length; i++) {
                    str += '<option value=' + res[i].id + '>' + res[i].mediaName + '</option>';
                }
                $("#mediaTwo").html(str);
            }
        });
    });
},*/
	//加载模态框分厂一级下拉框
	LoadModalAreaSelect:function(id) {
		$("#factoryMenu").empty();
		Ter.getApi({
				apiname: "/region/findByOneTwoRegion"
			},
			function(res) {
				if(res.result) {
					var select = $("#factoryMenu");
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
	loadChildSlect:function(){
		$("#areaMenu").empty(); //重置下拉框
		var aid = $.trim($('#factoryMenu option:selected').val()); //获取选中的区域
		if(aid==""){
			layer.alert("请先选择分厂！")
			return;
		}
		
		Ter.getApi({
				apiname:'/region/findByPid',
				params: {
					"pid": aid
				}
			},
			function(res) {
				console.log(res);
				if(res.result) {
					var select = $("#areaMenu");
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].aid + "'>" +
							res.result[i].aname + "</option>");
					}
				}
			})
		
	},
	
	//加载下拉框
	loadSlect: function() {
		Ter.getApi({
				apiname: '/region/findByTwoRegion',
				params: {
					"pid": 2
				}
			},
			function(res) {

				if(res.result) {
					var select = $("#factoryMenu");
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].aid + "'>" +
							res.result[i].aname + "</option>");
					}

				}
			})
	},
	
	//计划添加、编辑
	btnEdit: function(parm) {
		if(parm == 0) {		
			
			$("#name").html("新增计划");
			$("#planModal").modal("show");
			$('#factoryMenu').val('');
			$('#areaMenu').val('');
			$('#mediaName').val('');
			$('#planNumber').val('');
			$('#planUseTotal').val('');
			$('#planOutputTotal').val('');
			this.LoadModalAreaSelect("");
			this.LoadModalMediaSelect("");
			
		} else {
			var rows = $('#planTable').bootstrapTable('getSelections');
			if(rows.length != 1) {
				layer.alert("请选择一条数据进行编辑！")
				return;
			}
			console.log(rows[0])
			$("#name").html("编辑计划");
			//会显选中的用户信息
			$("#planModal").modal("show");
			
//			$('#planStartDayDate').val(rows[0].substring(6,8));
//			$('#startMonthDate').val(rows[0].substring(4,6));
//			$('#startYearDate').val(rows[0].substring(0,4));
			$('#mediaName').val(rows[0].mediaName);
			$('#planNumber').val(rows[0].planNumber);
			$('#planUseTotal').val(rows[0].planUseTotal);
			$('#planOutputTotal').val(rows[0].planOutputTotal);
			this.LoadModalAreaSelect(rows[0].pid);//加载分厂下拉框
			this.LoadModalMediaSelect("");//加载介质下拉框
		}

	},
	
	//添加编辑数据方法 提交表单
	btnOk: function() {
		var pid = $.trim($('#parentMenu option:selected').val());
		var id = $('#id').val();
		var menuname = $('#menuname').val();
		var munuurl=$('#menuurl').val();
		var url;
		if(id == null || id == undefined || id == "") { //菜单添加
			url = '/menu/insert';
			var menu = {
				"pid": pid,
				"menuname": menuname,
				"munuurl":munuurl
			}
		} else {
			url = '/menu/update';
			var menu = {
				"pid": pid,
				"id": id,
				"menuname": menuname,
				"munuurl":munuurl
			}
		}
		Ter.getApi({
				apiname: url,
				params: menu
			},
			function(res) {
				if(res.errCode == "SUCCESS") {
					layer.alert(res.errMsg);
					$('#planModal').modal('hide');
					mediaTable.loadTableData();
				}

			})
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
						apiname: '/menu/delete',
						params: dataStr
					},
					function(res) {
						if(res.errCode == "SUCCESS") {
							layer.alert(res.errMsg)
							mediaTable.loadTableData();
						}
					})
			}
		)
	}
	
}
$(function() {
	mediaTable.init();
});