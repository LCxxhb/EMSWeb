/***用水报表****/
var reportType = "", startDate = "", endDate = "";
var waterReport = {
    init: function () {
        this.initDate();//日期初始化
        //this.initTree();//目录树        
        //this.initInstantTable();//列表初始化
        //this.reportType();//报表类型切换
        this.initTable();
        this.calcTableHeight();
        this.getFactory();
    },
    initDate: function () {
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
            theme: { bgcolor: "#0196c9", pnColor: "#00CCFF" },//主题色
            format: "YYYY-MM-DD",
            zIndex: 3000,
            isTime: true,
        });
        /*//日结束
        jeDate("#endInstantDate", {
            onClose: false,
            isinitVal: true,
            isClear: false,
            initDate: [{ DD: "-1" }, true],
            maxDate: jeDate.nowDate(-1),
            theme: { bgcolor: "#0196c9", pnColor: "#00CCFF" },//主题色
            format: "YYYY-MM-DD",
            zIndex: 3000,
            isTime: true,
        });
        //日开始
        jeDate("#startDayDate", {
            onClose: false,
            isinitVal: true,
            isClear: false,
            initDate: [{ MM: "-1" }, true],
            maxDate: jeDate.nowDate(-1),
            theme: { bgcolor: "#0196c9", pnColor: "#00CCFF" },//主题色
            format: "YYYY-MM-DD",
            zIndex: 3000,
            isTime: true,
        });
        //日结束
        jeDate("#endDayDate", {
            onClose: false,
            isinitVal: true,
            isClear: false,
            initDate: [{ DD: "-1" }, true],
            maxDate: jeDate.nowDate(-1),
            theme: { bgcolor: "#0196c9", pnColor: "#00CCFF" },//主题色
            format: "YYYY-MM-DD",
            zIndex: 3000,
            isTime: true,
        });
        //月开始        
        jeDate("#startMonthDate", {
            onClose: false,
            isinitVal: true,
            isClear: false,
            theme: { bgcolor: "#0196c9", pnColor: "#00CCFF" },//主题色
            minDate: jeDate.nowDate({ MM: "-12" }),
            maxDate: jeDate.nowDate(),
            format: "YYYY-MM",
            initDate: [{ MM: "-1" }, true],
            zIndex: 3000,
            isTime: true,
        });
        //月结束
        jeDate("#endMonthDate", {
            isinitVal: true,
            theme: { bgcolor: "#0196c9", pnColor: "#00CCFF" },//主题色
            format: "YYYY-MM",
            minDate: jeDate.nowDate({ MM: "-12" }),
            maxDate: jeDate.nowDate(),
            onClose: false,
            isClear: false,
            maxDate: jeDate.nowDate(),
            zIndex: 9000,
            isTime: true
        });*/
    },
    calcTableHeight: function () {
        var t_height = $(".content-wrapper").height() - $(".page-btns-box").outerHeight() - 60;
        $(".page-main-box").outerHeight(t_height);
        return t_height - 50;
    },
    /*//报表类型
    reportType: function () {
        $("#reportType").on("change", function () {
            var reportTypeVal = $(this).val();
            if (reportTypeVal == "1") {
                $(".pumpRunCount-search .input-group").hide();
                $(".dayGroup-box").show();
                $('.dateinput').removeClass('dateTime');
                $(".dayGroup-box .dateinput").addClass('dateTime');

            } else {
                if (reportTypeVal == "2") {
                    $(".pumpRunCount-search .input-group").hide();
                    $(".monthGroup-box").show();
                    $('.dateinput').removeClass('dateTime');
                    $(".monthGroup-box .dateinput").addClass('dateTime');
                } else if (reportTypeVal == "3") {
                    $(".pumpRunCount-search .input-group").hide();
                    $(".yearGroup-box").show();
                    $('.dateinput').removeClass('dateTime');
                    $(".yearGroup-box .dateinput").addClass('dateTime');
                }
            }
        })
    },
    initTree: function () {
        var self = this;
        var setting = {
            view: {
                addHoverDom: false,
                removeHoverDom: false,
                selectedMulti: false,
            },
            check: {
                enable: true,
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
                onClick: function (event, treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                    zTree.checkNode(treeNode, !treeNode.checked, null, true);
                },
                onCheck: function (event, treeId, treeNode) {
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
        //Ter.getApi({
        //    //apiname: "SecondSupply/PumpManage/getPumpTree"
        //}, function (res) {

        //});

        var zNodes = [{
            id: 0,
            name: "主菜単",
            "nocheck": true,
            open: true
        }, {
            id: 1,
            pId: 0,
            name: "一級菜單",
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
            name: "一級菜單",
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
            name: "一級菜單",
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
        //设备加单选框
        for (var i = 0; i < zNodes.length; i++) {
            if (zNodes[i].scolum == "AEqu") {
                zNodes[i].nocheck = false;
            } else {
                zNodes[i].nocheck = true;
            }
        }
        if (zNodes.length == 0) return;
        var num1_id = zNodes[0].sid;
        self.treeId = num1_id;
        $.fn.zTree.init($("#treeDemo"), setting, zNodes);
        fuzzySearch('treeDemo', '#keywords', '#treesearch', false, false); //初始化模糊搜索方法            
        //默认选中第一个
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var node = treeObj.getNodeByParam("sid", num1_id);
        treeObj.selectNode(node);
        treeObj.checkNode(node, true, true);
       // self.waterData();
    },
    //查询
    waterData: function () {
        var self = this;
        if (!self.treeId) { layer.alert("请先勾选设备", { title: "提示" }); return; }
        waterType = $("#pressureType").val();
        reportType = $("#reportType").val();
        $(".startDate").each(function () {
            if ($(this).hasClass('dateTime')) { startDate = $(this).val(); }
        })
        $(".endDate").each(function () {
            if ($(this).hasClass('dateTime')) { endDate = $(this).val(); }
        })
        if (Ter.dateCompare(startDate, endDate)) {
            if ($("#reportType").val() == "1") {
                var s = endDate.split('-'), e = startDate.split('-');
                var sDate = new Date(s[0], s[1], s[2]), eDate = new Date(e[0], e[1], e[2]);
                var days = (sDate - eDate) / (24 * 3600 * 1000) + 1;
                if (days > 7) {
                    layer.alert("相差日期天数不能大于7", { title: '提示' }); return;
                }
            }
        } else {
            layer.alert("结束时间要大于开始时间", { title: "提示" }); return;
        }
        Ter.getApi({
            apiname: "SecondSupply/ReportForm/PressureReport",
            params: {
                equId: self.treeId,
                waterType: waterType,
                reportType: reportType,
                startDate: startDate,
                endDate: endDate
            }
        },
            function (res) {
                //日平均压力或月平均压力列表
                var averageTable = res.Result.AvgPressure;
                //瞬时压力图表
                var instantPreChart = res.Result.ChartRealPressure;
                if (averageTable == "") {
                    self.loadTable(res.Result.PressureColums, res.Result.RealPressure);
                    var instantX = instantPreChart.Xval.split(",");
                    var instantY = instantPreChart.Yval1;
                    var instantDay = [];
                    for (var i = 0; i < instantY.length; i++) {
                        instantDay.push(instantY[i].name);
                    }
                    self.instantChart(instantDay, instantX, instantY);
                }
                else if (averageTable) {
                    var chartXval = [], chartYavg = [], chartYpass = [];
                    averageTable.forEach(function (value) {
                        chartXval.push(value.AcqTime);
                        chartYavg.push(value.AvgVal);
                        chartYpass.push(value.Pass);
                    });
                    self.avgChart(chartXval, chartYavg, chartYpass);
                    var averNewTable = averageTable;
                    for (var i = 0; i < averNewTable.length; i++) {
                        averNewTable[i].Pass = (averNewTable[i].Pass * 100).toFixed(2) + "%";
                    }
                    self.initTable();
                    $("#table").bootstrapTable("load", averNewTable);
                }
            }
        );
    },
    //瞬时压力图表
    instantChart: function (instantDay, instantX, valY) {
        var self = this;
        $("#instantChart").show().siblings().hide();
        var instantChart = echarts.init($('#instantChart')[0]);
        var option = {
            legend: {
                data: instantDay,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: "line"
                }
            },
            toolbox: {
                feature: {
                    magicType: { show: true, type: ['line', 'bar'] },
                    saveAsImage: { show: true }
                },
            },
            xAxis: {
                type: 'category',
                name: '日期',
                boundaryGap: false,
                data: instantX
            },
            yAxis: {
                type: 'value',
                name: '压力值(MPa)',
            },
            series: valY
        };
        instantChart.setOption(option, true);
        window.onresize = function () {
            instantChart.resize();
        }
    },
    //瞬时压力列表
    initInstantTable: function () {
        var self = this;
        $("#instantTable").bootstrapTable({
            height: self.calcTableHeight(),//表格高度
            striped: true,//隔行变色           
            onClickRow: function (row, element) {
                $('.click').removeClass('click');
                $(element).addClass('click');
            }
        })
    },
    //瞬时压力列表加载数据
    loadTable: function (columns, data) {
        $("#preInstantTable").show().siblings().hide();
        $('#instantTable').bootstrapTable("refreshOptions", { columns: columns }).bootstrapTable("load", data);
    },
    //日平均压力、月平均压力图表
    avgChart: function (chartXval, chartYavg, chartYpass) {
        var self = this;
        $("#averageChart").show().siblings().hide();
        var percentPass = new Array;
        for (var i = 0; i < chartYpass.length; i++) {
            percentPass.push((chartYpass[i] * 10 * 10).toFixed(2));
        }
        var instantChart = echarts.init($('#averageChart')[0]);
        option = {
            timeline: {
                height: -120,
                lineStyle: {
                    color: '#ddd'
                },
                controlStyle: {
                    show: false,
                },
            },
            options: [{
                textStyle: {
                    fontSize: 14,
                    height: 80,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
                            textStyle: {
                                color: '#666',
                            },
                        },
                    },
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
                    textStyle: {
                        color: '#666',
                    },
                },
                toolbox: {
                    'show': false,
                    feature: {
                        'magicType': {
                            'show': true,
                            'type': ['bar', 'line']
                        },
                        restore: {
                            'show': true
                        },
                        saveAsImage: {
                            'show': true
                        }
                    }
                },
                legend: {
                    data: ['压力值', '合格率'],
                },
                grid: {
                    top: '100',
                    left: '3%',
                    right: '3%',
                    bottom: '60',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: chartXval,
                }],
                yAxis: [{
                    name: '压力值(MPa)',
                    type: 'value',
                }, {
                    name: '合格率(%)',
                    type: 'value',
                    position: 'right',
                }],
                series: [{
                    'name': '压力值',
                    'type': 'bar',
                    'data': chartYavg,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#229aff'
                                },
                                {
                                    offset: 1,
                                    color: '#13bfe8'
                                }
                                ]
                            )
                        }
                    }
                }, {
                    name: '合格率',
                    yAxisIndex: 1,
                    type: 'line',
                    showAllSymbol: true,
                    symbol: 'emptyCircle',
                    symbolSize: 10,
                    data: percentPass,
                    itemStyle: {
                        normal: {
                            color: '#fdb94e'
                        },
                    },
                }]
            }]
        };
        instantChart.setOption(option, true);
        window.onresize = function () {
            instantChart.resize();
        }
    },*/
    //日平均压力、月平均压力列表
    initTable: function () {
        var self = this;
        $("#preAverageTable").show().siblings().hide();
        $("#table").bootstrapTable({
            height: self.calcTableHeight(),
            striped: true,//隔行变色
            columns: [{
            	field: 'factory',
                title: '分厂',
                align: 'center'
            }, {
                field: 'area',
                title: '区域',
                align: 'center'
            }, {
				field: 'point',
				title: '采集点',
				align: 'center'
			}, {
				field: 'describe',
				title: '采集点描述',
				align: 'center'
			},{
                field: 'medium',
                title: '介质类型',
                align: 'center'
            },  {
                field: 'type',
                title: '产出/消耗',
                align: 'center'
            }, {
                field: 'value',
                title: '产出/消耗量',
                align: 'center'
            }, {
                field: 'time',
                title: '日期',
                align: 'center'
            }],
            data: [{
            	factory:'炼铁厂',
                area: '煤气液化炉',
                point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
            }, {
            	factory:'炼铁厂',
                area: '1#高炉',
                point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
            }],
        });
    },
    getFactory:function(){
    	var factorys=["炼铁厂","炼钢厂","轧钢厂","能源部"];  	
    	window.onload=start;
    	var wf=document.getElementById("waterFactory");
    	function start()
    	{
    		for(var i=0;i<factorys.length;i++)
    		{
    			var op=document.createElement("option");
    		    op.innerHTML=factorys[i];
    		    wf.appendChild(op);
    	    }
    	}   	   	
    	/*var a=document.getElementById("waterArea");
    	var s=document.getElementById("waterShop");*/    	
    },
    getArea:function(){
    	var areas=[["球团","炼铁新区"],
    	["连铸作业区","炼钢作业区","供辅作业区"],
    	["3350轧钢作业区","3800轧钢作业区","热处理"],
    	["供水作业区","制氧站"]];
    	var wf=document.getElementById("waterFactory");
    	var wa=document.getElementById("waterArea");   	
    	var fl=wf.selectedIndex;
    	var fa=areas[fl-1];
    	wa.length=1;
    	for(var j=0;j<fa.length;j++)
    	{
    		var op1=document.createElement("option");
    		    op1.innerHTML=fa[j];
    		    wa.appendChild(op1);
    	}
    },   
};
//初始化
$(function () {
    waterReport.init();
})