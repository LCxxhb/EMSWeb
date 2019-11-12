var mediaDetails = {
    init: function () {

        this.loadTable(); //加载table
    },
    loadTable: function () {
        $('#mytable').bootstrapTable({
            pagination: true, //是否显示分页（*）
            striped: true, //隔行变色
            search: true,
            columns: [{
                field: 'id',
                title: 'ID',
                visible: false,
            }, {
                field: 'mediaName',
                title: '介质名',
                align: 'center'
            }, {
                field: 'cz',
                title: '操作',
                formatter: mediaDetails.action,
                align: 'center'
            }]
        });
        this.loadTableData("");
    },
    action: function (value, row, mediaDetails)  {
        console.log(row);
        var col = '<a style="cursor: pointer; text-decoration: none!important;" href="javascript:void(0)" class="ter-visibleBtn" data-power="修改" onclick="mediaDetails.btnEdit(' + JSON.stringify(row).replace(/\"/g, "'") + ');">修改</ a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor: pointer;text-decoration: none!important;" class="ter-visibleBtn" data-power="删除" onclick=mediaDetails.btnDelete("' + row.id+ '","'+row.pid+'")>删除</ a>';
        return col;
    },
    loadTableData: function () {
        var url = "/Media/findAllMedia";
        Ter.getApi({
                apiname: url
            },
            function (res) {
                if (res.result) {
                    console.log(res.result);
                    //加载表格
                    $("#mytable").bootstrapTable('load', res.result);
                }
            })
    },
    btnDelete: function (id,mid) {
        layer.confirm("确认要删除？", {
                btn: ['确定', '取消'],
                title: "提示"
            },
            function () {
                var dataStr = {
                    "id": id
                };
                Ter.getApi({
                        apiname: 'Media/delete',
                        params: dataStr
                    },
                    function (res) {
                        if (res.errCode == "SUCCESS") {
                            layer.alert(res.errMsg);
                            //layer.msg(res.errMsg);
                            if(mid==0){
                                mediaDetails.btnSearch1();
                            }else {
                                mediaDetails.btnSearch2();
                            }

                        }
                    })
            }
        )

    },
    btnSearch1:function(){
        var url = "/Media/findByOneMedia";
        Ter.getApi({
                apiname: url
            },
            function (res) {
                if (res.result) {
                    console.log(res.result);
                    //加载表格
                    $("#mytable").bootstrapTable('load', res.result);
                }
            })
    },
    btnSearch2:function(){
        var url = "/Media/findByTwoMedia";
        Ter.getApi({
                apiname: url
            },
            function (res) {
                if (res.result) {
                    console.log(res.result);
                    //加载表格
                    $("#mytable").bootstrapTable('load', res.result);
                }
            })
    },
    btnEdit: function (Media) {
        var row = Media;
        //会显选中的用户信息
        $("#myModal1").modal("show");
        $('#id').val(row.id);
        $('#mediaName').val(row.mediaName);
    },
    btnOK: function () {
        var id = $.trim($('#id').val());
        var mediaName = $.trim($('#mediaNameOne').val());
        url = '/Media/update';
        params = {
            "id": id,
            "mediaName": mediaName,
        }
        Ter.getApi({
                apiname: url,
                params: params
            },
            function (res) {
                console.log(res);
                if (res.errCode == "SUCCESS") {
                    layer.alert(res.errMsg);
                    $("#myModal1").modal("hide");
                    window.location.reload();
                };
            },)
    },
    }
//初始化
$(function() {
    mediaDetails.init();
});