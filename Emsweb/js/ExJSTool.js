var ExJSTool = {
    inIframe: function () { //页面在Iframe之内
        if (self != top) return true; return false;
    }
};

//日期格式转化
//// new Date().Format('yyyy-MM-dd');
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
/********删除数组指定元素**********/
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};
//数组去重,返回值为去重后的数组
Array.prototype.unique = function () {
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++) {
        if (!json[this[i]]) {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
};

function getDate(date) {//判断结束日期大于开始日期
    var dates = date.split("-");
    var dateReturn = '';
    for (var i = 0; i < dates.length; i++) {
        dateReturn += dates[i];
    }
    return dateReturn;
}
function treeToggle(table) {
    if (table) {
        $('#' + table).bootstrapTable('resetView');
    }
    if ($(".tree-wrapper").hasClass("treeCollapse")) {
        $(".page-container").addClass("hasTree");
        $(".tree-wrapper").removeClass("treeCollapse");
    } else {
        $(".page-container").removeClass("hasTree");
        $(".tree-wrapper").addClass("treeCollapse");
    }
}