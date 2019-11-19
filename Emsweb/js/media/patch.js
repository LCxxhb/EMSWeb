var patch = {
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
                field: 'patchName',
                title: '采集点名称',
                align: 'center'
            }, {
                field: 'cz',
                title: '操作',
                formatter: patch.action,
                align: 'center'
            }]
        });
        this.loadTableData("");
    },
    action: function (value, row, patch) {
        var col = '<a style="cursor: pointer; text-decoration: none!important;" href="javascript:void(0)" class="ter-visibleBtn" data-power="修改" onclick="patch.btnEdit(' + JSON.stringify(row).replace(/\"/g, "'") + ');">修改</ a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor: pointer;text-decoration: none!important;" class="ter-visibleBtn" data-power="删除" onclick=patch.btnDelete("' + row.id + '")>删除</ a>';
        return col;
    },
    //加载表格数据
    loadTableData: function () {
        var url = "/Patch/findAllPatch";
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
    //添加按钮
    btnAdd :function(){
        $("#myModal1").modal("show");
        $("#patchName1").val("");
    },
    //修改按钮触发
    btnEdit: function (patch) {
        var row = patch;
        //会显选中的用户信息
        $("#myModal2").modal("show");
        $('#id').val(row.id);
        $('#patchName').val(row.patchName);
    },
    btnOk: function (parm) {
        var url;
        var params = {};
        if (1==parm){
            var patchName= $.trim($('#patchName1').val());
            url = '/Patch/insert';
            params = {
                "patchName": patchName
            }
        } else{
            var id = $.trim($('#id').val());
            var patchName = $.trim($('#patchName').val());
            url = '/Patch/update';
            params = {
                "id": id,
                "patchName": patchName,
            }
        }
        Ter.getApi({
                apiname: url,
                params: params
            },
            function (res) {
                //  console.log(res);
                if (res.errCode == "SUCCESS") {
                    layer.alert(res.errMsg);
                    if(1==parm){
                        $("#myModal1").modal("hide");
                    }else{
                        $("#myModal2").modal("hide");
                    }
                    patch.loadTable("");
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
                        apiname: '/Patch/delete',
                        params: dataStr
                    },
                    function (res) {
                        if (res.errCode == "SUCCESS") {
                            layer.alert(res.errMsg);
                            patch.loadTableData();
                        }
                    })
            }
        )

    },
}
$(function () {
    patch.init()
})