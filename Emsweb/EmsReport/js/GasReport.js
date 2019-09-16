var GasReport = {
    init: function () {
        this.initDate();//日期初始化
        //this.calcTableHeight();
        //this.initTable();
    },
    initDate: function () {
        //日开始
        jeDate("#startInstantDate", {
            onClose: false,
            isinitVal: true,
            isClear: false,
            initDate: jeDate.nowDate(),
            maxDate: jeDate.nowDate(),
            theme: { bgcolor: "#0196c9", pnColor: "#00CCFF" },//主题色
            format: "YYYY-MM-DD",
            zIndex: 3000,
            isTime: true,
        });


        //$(".td_bold").hover(function () {
        //    $(".td_bold").css("background-color", "#f5f5f5");
        //})

    },
    calcTableHeight: function () {
        var t_height = $(".content-wrapper").height() - $(".page-btns-box").outerHeight();
        $(".page-main-box").outerHeight(t_height);
        return t_height - 50;
    },
    initTable: function () {
        var self = this;
        $("#table").bootstrapTable({
            height: self.calcTableHeight(),
            striped: false//隔行变色
        });
    },
};

$(function () {
    GasReport.init();
})