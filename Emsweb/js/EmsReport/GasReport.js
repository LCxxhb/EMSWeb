var GasReport = {
    init: function () {
        this.initDate();//日期初始化
        this.calcTableHeight();
        this.initTable();
    },
    initDate: function () {
        //日开始
        jeDate("#startInstantDate", {
            onClose: false,
            isinitVal: true,
            isClear: false,
            initDate: jeDate.nowDate(),
            maxDate: jeDate.nowDate(),
            theme: {bgcolor: "#0196c9", pnColor: "#00CCFF"},//主题色
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
    calcTableHeight: function () {
        var t_height = $(".content-wrapper").height() - $(".page-btns-box").outerHeight();
        $(".page-main-box").outerHeight(t_height);
        return t_height - 50;
    },

    initTable: function () {
        var self = this;
        $('#instantTable').bootstrapTable({
            height: self.calcTableHeight(),
            /*search: false,
            pagination: true,
            pageSize: 15,
            pageNumber: 1, //初始化加载第一页，默认第一页,并记录*/
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
                field: 'unit',
                title: '单位',
                align: 'center'
            }, {
                field: 'type',
                title: '产出/消耗量',
                align: 'center'
            }, {
                field: 'value',
                title: '每小时平均量',
                align: 'center'
            }, {
                field: 'time',
                title: '日期',
                align: 'center'
            }],
            data: [{
            	factory:'炼铁厂',
                area: '煤气液化炉',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼铁厂',
                area: '1#高炉',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼铁厂',
                area: '2#高炉',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼铁厂',
                area: '3#热风炉',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼铁厂',
                area: '球团',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼铁厂',
                area: '白灰',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼铁厂',
                area: '20000制氧',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼铁厂',
                area: '6000制氧',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼铁厂',
                area: '3#高炉富氧',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼钢厂',
                area: '炼钢氧气',
                unit: '',
                type: '',
                value: '',
                time: ''
            }, {
            	factory:'炼钢厂',
                area: '轧钢氧气',
                unit: '',
                type: '',
                value: '',
                time: ''
            }]
        });
    },
};
$(function () {
    GasReport.init();
});