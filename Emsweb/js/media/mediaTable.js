var mediaTable = {

	init: function() {
		mediaTable.loadTable(); //加载table
		mediaTable.initDate();
		mediaTable.loadSlect();
		mediaTable.loadTableData1();
		this.loadMediaOneSelect();//加载一级介质下拉框
		this.LoadPatchSelect();//加载采集点数据下拉框
		let data1 = ['请选择介质和采集点'];
		let data2 = [{value: 999999, name: '请选择介质和采集点'}];
		this.initChart2(data1,data2);


	},
	// 表结构
				loadTable: function () {
					$('#mytable').bootstrapTable({
						clickEdit: true,
						pagination: true, //是否显示分页（*）
						striped: true, //隔行变色
						pagination: true,                   //是否显示分页（*）
						sidePagination: "client",           //分页方式：client客户端分页，server服务端分页（*）
						paginationLoop: false,		  //当前页是边界时是否可以继续按
						pageNumber:1,                       //初始化加载第一页，默认第一页
						pageSize: 10,                       //每页的记录行数（*）
						pageList: [10, 25, 50, 100,'all'],  //可供选择的每页的行数（*）
						contentType: "application/x-www-form-urlencoded",//一种编码。在post请求的时候需要用到。这里用的get请求，注释掉这句话也能拿到数据
						search: true,                     //是否显示表格搜索，此搜索是客户端搜索，不会进服务端
						strictSearch: false,		  //是否全局匹配,false模糊匹配
						showColumns: true,                  //是否显示所有的列
						showRefresh: true,                  //是否显示刷新按钮

						minimumCountColumns: 2,             //最少允许的列数
						clickToSelect: false,               //是否启用点击选中行
						showToggle:true,                    //是否显示详细视图和列表视图的切换按钮
						cardView: false,                    //是否显示详细视图
						detailView: false,                  //是否显示父子表
						cache: false,                       // 设置为 false 禁用 AJAX 数据缓存， 默认为true
						sortable: true,                     //是否启用排序
						sortOrder: "asc",                   //排序方式
						sortName: 'mid', // 要排序的字段
						columns: [{
							field: "mid",
							title: "介质id",
							visible: false
						}, {
							field: "mediaName",
							title: "介质名",
						}, {
							field: "projectName",
							title: "属性名",
						}, {
							field: "patchName",
							title: "采集点",
						}, {
							field: "mediaData",
							title: "化验数值",
							formatter: function(value,row,index) {
								//通过判断单元格的值，来格式化单元格，返回的值即为格式化后包含的元素
								var a = "";
								var v=row.spare1;
								if(v == "1") {
									a = '<span style="color:#00B83F">'+value+'</span>';
								}else if(v == "2"){
									a = '<span style="color:#0000ff">'+value+'</span>';
								}else if(v == "3") {
									a = '<span style="color:#FF0000">'+value+'</span>';
								}else{
									a = '<span>'+value+'</span>';
								}
								return a;
							}
			}, {
				field: "spare1",
				title: "是否达标",
				visible: false,
			}, {
				field: "minimum",
				title: "最小值",

			}, {
				field: "maximum",
				title: "最大值",
			},  {
				field: "createDate",
				title: "录入时间",
			}, {
				field: "unitName",
				title: "单位",
			}, {
				field: "state",
				title: "说明",
			}],
			//导出excel表格设置
			showExport: true,//是否显示导出按钮(此方法是自己写的目的是判断终端是电脑还是手机,电脑则返回true,手机返回falsee,手机不显示按钮)
			exportDataType: "all",              //basic', 'all', 'selected'.
			exportTypes:['excel'],	    //导出类型
			//exportButton: $('#btn_export'),     //为按钮btn_export  绑定导出事件  自定义导出按钮(可以不用)
			exportOptions: {
				//ignoreColumn: [0,0],            //忽略某一列的索引
				fileName: '质检数据表',              //文件名称设置
				worksheetName: 'Sheet1',          //表格工作区名称
				tableName: '介质检验数据表',
				excelstyles: ['background-color', 'color', 'font-size', 'font-weight'],
			}
		})
	},
	//查看所有数据
	loadTableData: function() {
		var url="/MediaData/findMediaDataList";
		//var params={};
		var mid = $("#mediaTwo").val();
		if(mid==0){
			alert("请选择二级介质项");
			return;
		};
		var patchName = $("#patchName").val();
		var spare1 = $("#spare1").val();
		var startTime = $("#startTime").val();
		var endTime =  $("#endTime").val();
		Ter.getApi({
				apiname: url,
				params: {
					"mid": mid,
					"patchName": patchName,
					"spare1": spare1,
					"startTime": startTime,
					"endTime": endTime
				}
			},
			function(res) {
				if(res.result) {
					console.log(res.result);
					var result = res.result;
					//加载表格
					$("#mytable").bootstrapTable('load', res.result);
					if(spare1==0&&startTime==""&&endTime==""&&patchName!=0){
						let data1 = [];
						let data2 = [];
						for(var i = 0; i < result.length; i++) {

							var data3 = {
								"value":result[i].mediaData,
								"name":result[i].projectName
							};
							data1.push(result[i].projectName);

							data2.push(data3);
						}
						mediaTable.initChart2(data1,data2);
					}else {
						let data1 = ['请选择介质和采集点'];
						let data2 = [{value: 999999, name: '请选择介质和采集点'}];
						mediaTable.initChart2(data1,data2);
					}

				}
			})
	},

	initChart2: function (data1,data2) {
		var chart2 = echarts.init(document.getElementById('chart1'));
				chart2.setOption({
					// 是否触发数据项提示
					tooltip: {
						trigger: 'item',//散点图和饼状图等无类目轴的图表中使用item类型，折线图柱状图中使用axis类型
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					//图例，图表上方用于显示不同系列的标记，颜色和名字，可控制图例显示情况
					legend: {
						orient: 'vertical',// 图例列表的布局朝向。
						x: 'left',//图例位置
						data: data1//图例的数据项
					},
					//工具栏项，内置有导出图片、数据视图、动态类型切换、数据区域缩放和重置五种工具
					toolbox: {
						show: true,//是否显示工具栏
						//工具配置项
						feature: {
							mark: {show: true},
							// 数据视图工具，可以展示当前图表所用数据，编辑后可以动态更新
							dataView: {show: true, readOnly: false},//仅显示只读
							// 动态类型切换
							magicType: {
								show: true,
								type: ['pie', 'funnel'],//切换的类型
								//切换的图形配置
								option: {
									funnel: {
										x: '25%',
										width: '50%',
										funnelAlign: 'left',
										max: 1548
									}
								}
							},
							restore: {show: true},//配置项还原
							saveAsImage: {show: true}//配置项保存为图片
						}
					},
					calculable: true,
					// 系列列表。每个系列通过 type 决定自己的图表类型
					series: [
						{
							name: '访问来源',
							type: 'pie',//定义为饼状图
							radius: '55%',
							center: ['50%', '60%'],
							data:data2
						}
					]
				});
	},

	loadTableData1: function() {
		var url="/MediaData/findAllMediaData";
		Ter.getApi({
				apiname: url
			},
			function(res) {
				if(res.result) {
					console.log(res.result);
					//加载表格
					$("#mytable").bootstrapTable('load', res.result);
				}
			})
	},


	//页面日期控件
	initDate: function() {
		//日开始
		jeDate("#startTime", {
			onClose: false,//选中日期后关闭弹层
			isinitVal: false,//不初始化时间
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,//弹出层的层级高度
			clearfun:function(elem, val) {},//清除日期后的回调, elem当前输入框ID, val当前选择的值
		});

		//日结束
		jeDate("#endTime", {
			onClose: false,
			isinitVal: false,
			theme: {
				bgcolor: "#0196c9",//背景颜色
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD",
			zIndex: 3000,
		});
	},
	//加载模态框一级介质下拉框
	loadMediaOneSelect:function() {
		$("#mediaOne").empty();
		Ter.getApi({
				apiname: "/Media/findByOneMedia"
			},
			function(res) {
				console.log(res.result);
				if(res.result) {
					var select = $("#mediaOne");
					select.append("<option value='0'>-请选择-</option>");
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].id + "'>" +
							res.result[i].mediaName + "</option>");
					}
				}
			})
	},
	//加载模态框二级介质下拉框
	loadmediaTwoSlect:function(){
		$("#mediaTwo").empty(); //重置下拉框
		var select = $("#mediaTwo");
		var pid = $.trim($('#mediaOne option:selected').val()); //获取选中的区域
		select.append("<option value='0'>-请选择-</option>");
		if(pid==""||pid==0){
			//layer.alert("请先选择一级介质！");
			//select.append("<option value='0'>-请选择-</option>");
			return;
		}
		Ter.getApi({
				apiname:'/Media/findByPidMedia',
				params: {
					"pid": pid
				}
			},
			function(res) {
				console.log(res);
				if(res.result) {
					//select.append("<option value='0'>-请选择-</option>");
					for(var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].id + "'>" +
							res.result[i].mediaName + "</option>");
					}
				}
			})

	},
	// 加载采集点数据
	LoadPatchSelect: function () {
		$("#patchName").empty();
		Ter.getApi({
				apiname: "/Patch/findAllPatch"
			},
			function (res) {
				if (res.result) {
					var select = $("#patchName");
					select.append("<option value=''>-请选择-</option>");
					for (var i = 0; i < res.result.length; i++) {
						select.append("<option value='" + res.result[i].patchName + "'>" +
							res.result[i].patchName + "</option>");
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

	/*//实现删除计划的方法
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
	*/
}
$(function() {
	mediaTable.init();
});