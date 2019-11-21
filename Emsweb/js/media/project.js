var project = {
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
                field: 'projectName',
                title: '属性名',
                align: 'center'
            }, {
                field: 'cz',
                title: '操作',
                formatter: project.action,
                align: 'center'
            }]
        });
        this.loadTableData("");
    },
    action: function (value, row, project) {
       // console.log(row);
        var col = '<a style="cursor: pointer; text-decoration: none!important;" href="javascript:void(0)" class="ter-visibleBtn" data-power="修改" onclick="project.btnEdit(' + JSON.stringify(row).replace(/\"/g, "'") + ');">修改</ a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor: pointer;text-decoration: none!important;" class="ter-visibleBtn" data-power="删除" onclick=project.btnDelete("' + row.id + '")>删除</ a>';
        return col;
    },
    //加载表格数据
    loadTableData: function () {
        var url = "/Project/findAllProject";
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
        $("#projectName1").val("");
    },
    //修改按钮触发
    btnEdit: function (project) {
        var row = project;
        //会显选中的用户信息
        $("#myModal2").modal("show");
        $('#id').val(row.id);
        $('#projectName').val(row.projectName);
    },
    btnOk: function (parm) {
        var url;
        var params = {};
        if (1==parm){
            var projectName= $.trim($('#projectName1').val());
            url = '/Project/insert';
            params = {
                "projectName": projectName
            }
        } else{
            var id = $.trim($('#id').val());
            var projectName = $.trim($('#projectName').val());
            url = '/Project/update';
            params = {
                "id": id,
                "projectName": projectName,
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
                    project.loadTable("");
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
                        apiname: '/Project/delete',
                        params: dataStr
                    },
                    function (res) {
                        if (res.errCode == "SUCCESS") {
                            layer.alert(res.errMsg);
                            project.loadTableData();
                        }
                    })
            }
        )

    },
}
$(function () {
    project.init()
})