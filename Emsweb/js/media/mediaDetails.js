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
        //console.log(row);
        var col = '<a style="cursor: pointer; text-decoration: none!important;" href="javascript:void(0)" class="ter-visibleBtn" data-power="修改" onclick="mediaDetails.btnEdit(' + JSON.stringify(row).replace(/\"/g, "'")+');">修改</ a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor: pointer;text-decoration: none!important;" class="ter-visibleBtn" data-power="删除" onclick=mediaDetails.btnDelete("' + row.id+ '","'+row.pid+'")>删除</ a>';
        return col;
    },
    loadTableData: function () {
        var url = "/Media/findAllMedia";
        Ter.getApi({
                apiname: url
            },
            function (res) {
                if (res.result) {
                   // console.log(res.result);
                    //加载表格
                    $("#mytable").bootstrapTable('load', res.result);
                }
            })
    },
    // 添加一二级介质
    btnAdd: function(parm){
        if (1==parm) {
            $("#myModal1").modal("show");
            $("#mediaName").val("");
        } else {
            $("#myModal2").modal("show");
            $("#mediaNameTwo").val("");
            this.LoadModalSelect("");
        }
    },

    btnEdit: function (Media) {
        var row = Media;
        //会显选中的用户信息
        $("#myModal3").modal("show");
        $('#id').val(row.id);
        $('#mediaNameOne1').val(row.mediaName);
    },
    //添加修改介质模态框下的确定按钮
    btnOk: function(parm) {
        var url;
        var params = {};
        if (1 == parm) {
            var mediaName = $.trim($('#mediaNameOne').val());
            url = '/Media/insert';
            params = {
                "mediaName": mediaName
            }
        } else  if(2 == parm) {
            var pid = $.trim($('#mediaOne option:selected').val());
            var mediaName = $.trim($('#mediaNameTwo').val());
            url = '/Media/insert';
            params = {
                "pid": pid,
                "mediaName": mediaName
            }
        }else {
            var id = $.trim($('#id').val());
            var mediaName = $.trim($('#mediaNameOne1').val());
            url = '/Media/update';
            params = {
                "id": id,
                "mediaName": mediaName,
            }
        }
            Ter.getApi({
                    apiname: url,
                    params: params
                },
                function (res) {
                    //console.log(res);
                    if (res.errCode == "SUCCESS") {
                        layer.alert(res.errMsg);
                        if(1==parm){
                            $("#myModal1").modal("hide");
                        }else if(2==parm){
                            $("#myModal2").modal("hide");
                        }else{
                            $("#myModal3").modal("hide");
                        }

                        window.location.reload();
                    };
                },)
    },
//加载添加二级介质模态框中的一级介质下拉框
    LoadModalSelect: function() {
        $("#mediaOne").empty();
        Ter.getApi({
                apiname: "/Media/findByOneMedia"
            },
            function(res) {
                if(res.result) {
                    var select = $("#mediaOne");
                    for(var i = 0; i < res.result.length; i++) {
                        select.append("<option value='" + res.result[i].id + "'>" +
                            res.result[i].mediaName + "</option>");
                    }
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
                        apiname: '/Media/delete',
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
                            // location.replace(document.referrer);
                            // document.referrer //前一个页面的URL
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
                  //  console.log(res.result);
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
                  //  console.log(res.result);
                    //加载表格
                    $("#mytable").bootstrapTable('load', res.result);
                }
            })
    },
    }
//初始化
$(function() {
    mediaDetails.init();
});