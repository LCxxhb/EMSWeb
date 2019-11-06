var collection = {
    init: function () {
        this.LoadPatchSelect();//加载采集点数据下拉框
        this.loadSelect();//加载介质下拉框
        this.loadTable();//加载表格
    },
    // 表结构
    loadTable: function () {
        $('#mytable').bootstrapTable({
            toolbar: '#toolbar',
            clickEdit: true,
            pagination: true, //是否显示分页（*）
            striped: true, //隔行变色
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
            }, {
                field: "minimum",
                title: "最小值",

            }, {
                field: "maximum",
                title: "最大值",
            }, {
                field: "unitName",
                title: "单位",
            }, {
                field: "state",
                title: "说明",
            }],
            onDblClickCell: function (field, value, row, $element) {
                var upIndex = $element[0].parentElement.rowIndex - 1;
                if (field == "mediaData") {
                    $element[0].innerHTML = "<input id='inputCell' type='text' name='inputCell' style ='width: 80px' value='" + value + "'>";
                    $("#inputCell").focus();
                    $("#inputCell").blur(function () {
                        var newValue = $("#inputCell").val();
                        row[field] = newValue;
                        $(this).remove();
                        $('#mytable').bootstrapTable('updateCell', {
                            index: upIndex,
                            field: field,
                            value: newValue
                        });
                        collection.rowedit(row);
                    });

                }
            },
        })
    },
// 提交表格
    rowedit: function (row) {
        console.log(row);
        var params={
            mid:row.mid,
            mediaName:row.mediaName,
            projectName:row.projectName,
            patchName:row.patchName,
            mediaData:row.mediaData,
            minimum:row.minimum,
            maximum:row.maximum,
            unitName:row.unitName,
            state:row.state
        };
        if(row.mediaData=="null"){
            alert("请输入对应化验数据");
        }else {
        Ter.getApi({
                apiname: "/MediaData/insert",
                params: params
            },
            function (res) {
                console.log(res);
                if (res.errCode == "SUCCESS") {
                    layer.alert(res.errMsg);
                }
                layer.alert(res.errMsg);
            })
        }
    },

    // 录入数据按钮
    loadTableData: function () {
        var mid = $("#mediaTwo").val();
        // alert(pid);
        var id = $("#patchName1").val();
        if (mid == "" || mid == undefined) {
            alert("请选择需要查询的介质名")
        } else if (id == "" || mid == undefined) {
            alert("请选择采集点")
        } else {
            var url = '/MediaData/findByMidOrPidMediaData';
            params = {
                "mid": mid,
                "pid": id,
            },
                Ter.getApi({
                        apiname: url,
                        params: params
                    },
                    function (res) {
                        console.log(res);
                        if (res.errCode == "SUCCESS") {
                            //layer.alert(res.errMsg);
                            $("#mytable").bootstrapTable('load', res.result);
                        }
                        ;
                    })
        }
    },

   /* //加载模态框分厂一级下拉框
    loadMediaOneSelect:function(id) {
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

    },*/
    loadSelect: function () {
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
    },
    // 加载采集点数据
    LoadPatchSelect: function () {
        $("#patchName1").empty();
        Ter.getApi({
                apiname: "/Patch/findAllPatch"
            },
            function (res) {
                if (res.result) {
                    var select = $("#patchName1");
                    for (var i = 0; i < res.result.length; i++) {
                        select.append("<option value='" + res.result[i].id + "'>" +
                            res.result[i].patchName + "</option>");
                    }
                }
            })
    },
    // 添加采集点按钮
    btnAdd: function () {
        $("#myModal1").modal("show");
        $("#patchName").val("");
    },
    // 添加采集点表单提交确定按钮
    btnOk: function () {
        var patchName = $.trim($('#patchName').val());
        var url = '/Patch/insert';
        params = {
            "patchName": patchName
        },
            Ter.getApi({
                    apiname: url,
                    params: params
                },
                function (res) {
                    console.log(res);
                    if (res.errCode == "SUCCESS") {
                        layer.alert(res.errMsg);
                        $('#myModal1').modal('hide');
                    }
                    ;
                })
    }
}
//初始化
$(function () {
    collection.init();
})