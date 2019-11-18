var unit = {
    init: function () {
        this.loadTable()
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
                field: 'unitName',
                title: '单位名',
                align: 'center'
            }, {
                field: 'cz',
                title: '操作',
                formatter: unit.action,
                align: 'center'
            }]
        });
        this.loadTableData("");
    },
    action: function (value, row, project) {
        console.log(row);
        var col = '<a style="cursor: pointer; text-decoration: none!important;" href="javascript:void(0)" class="ter-visibleBtn" data-power="修改" onclick="unit.btnEdit(' + JSON.stringify(row).replace(/\"/g, "'") + ');">修改</ a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor: pointer;text-decoration: none!important;" class="ter-visibleBtn" data-power="删除" onclick=unit.btnDelete("' + row.id + '")>删除</ a>';
        return col;
    },
    //加载表格数据
    loadTableData: function () {
        var url = "/Unit/findAllUnit";
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
    //修改按钮触发
    btnEdit: function (project) {
        var row = project;
        //会显选中的用户信息
        $("#myModal1").modal("show");
        $('#id').val(row.id);
        $('#unitName').val(row.unitName);
    },
    btnOk: function () {
        var id = $.trim($('#id').val());
        var unitName = $.trim($('#unitName').val());
        var url = '/Unit/update';
        params = {
            "id": id,
            "unitName": unitName,
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
                    unit.loadTable("");
                }
                ;
            },)
    },
    btnDelete: function (id) {
        layer.confirm("确认要删除？", {
                btn: ['确定', '取消'],
                title: "提示"
            },
            function () {
                var dataStr = {
                    "id": id
                };
                Ter.getApi({
                        apiname: '/Unit/delete',
                        params: dataStr
                    },
                    function (res) {
                        if (res.errCode == "SUCCESS") {
                            layer.alert(res.errMsg);
                            unit.loadTableData();
                        }
                    })
            }
        )

    },
}
$(function () {
    unit.init()
})