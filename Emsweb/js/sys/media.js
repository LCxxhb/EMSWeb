var quality = {
    init: function () {
        this.initTree();//目录树
        this.loadTable(); //加载table
    },
    // 树结构
    initTree: function () {
        var self = this;
        var setting = {
            view: {
                addHoverDom: false,
                removeHoverDom: false,
                selectedMulti: false,
            },
            data: {
                simpleData: {
                    enable: true,
                    idKey: "id",
                    pIdKey: "pid",
                    rootPId: 0
                },
                key:{
                    name: "mediaName"
                }
            },
            edit: {
                enable: false
            },
            callback: {
                onClick: function (event, treeId, treeNode) {
                    console.log(treeNode.id);
                    quality.loadTableData(treeNode.id);
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
        var zNodes1=[];
        Ter.getApi({
           apiname: "Media/findAllMedia"
        }, function (res) {
            zNodes1=res.result;
            //console.log(zNodes1);
            if (zNodes1.length == 0) return;
            var num1_id = zNodes1[0].id;
            self.treeId = num1_id;
            $.fn.zTree.init($("#treeDemo"), setting, zNodes1);

            //默认选中第一个
            var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
            var node = treeObj.getNodeByParam("id", num1_id);
            treeObj.selectNode(node);
            treeObj.checkNode(node, true, true);
            // self.waterData();
        });
    },
    loadTable: function() {
        $('#mytable').bootstrapTable({
            pagination: true, //是否显示分页（*）
            striped: true, //隔行变色
            columns: [{
                field: 'id',
                title: 'ID',
                visible: false,
            }, {
                field: 'mediaName',
                title: '介质名',
            }, {
                field: 'projectName',
                title: '属性名',
            }, {
                field: 'minimum',
                title: '最小值',
            }, {
                field: 'maximum',
                title: '最大值',
            }, {
                field: 'unitName',
                title: '单位',
            }, {
                field: 'state',
                title: '说明',
            },{
                field: 'cz',
                title: '操作',
                formatter: quality.action,
                align: 'center'
            }]
        });
        this.loadTableData("");
    },
    action: function (value, row, quality) {
        console.log(row);
        var col = '<a style="cursor: pointer; text-decoration: none!important;" href="javascript:void(0)" class="ter-visibleBtn" data-power="修改" onclick="quality.btnEdit('+JSON.stringify(row).replace(/\"/g,"'")+');">修改</ a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a style="cursor: pointer;text-decoration: none!important;" class="ter-visibleBtn" data-power="删除" onclick=quality.btnDelete("'+row.id+'")>删除</ a>';
        return col;
        //onclick="eidtField('+JSON.stringify(row).replace(/\"/g,"'")+')"
    },
    loadTableData:function(treeId)
    {
        var parms;
        var url;
        if (treeId=="")
        {
            url="MediaOrProject/findAllMediaOrProject";
            Ter.getApi({
                    apiname: url
                },
                function (res) {
                    console.log(res);
                    if (res.errCode == "SUCCESS") {
                        $("#mytable").bootstrapTable('load', res.result);
                    }

                })
        }else {

            url="MediaOrProject/findByMidMediaOrProject";
            parms = {mid:treeId};
            Ter.getApi({
                    apiname: url,
                    params: parms
                },
                function (res) {
                    console.log(res);
                    if (res.errCode == "SUCCESS") {
                        $("#mytable").bootstrapTable('load', res.result);
                    }

                })
        }



    },
    //添加一级和二级介质
    btnAdd: function (parm) {
        if (1==parm) {
            $("#myModal1").modal("show");
            $("#mediaName").val("");
        } else if (2==parm) {
            $("#myModal2").modal("show");
            $("#mediaNameTwo").val("");
            this.LoadModalSelect("");
        } else if(3==parm){
            $("#myModal3").modal("show");
            $("#projectName1").val("");
        }else if(4==parm){
            $("#myModal4").modal("show");
            $("#unitName1").val("");
        }else if(5==parm){
            $("#myModal5").modal("show");
            this.LoadModalMediaSelect("");
            this.LoadModalProjectSelect("");
            this.LoadModalUnitSelect("");
        }
    },
    btnOk:function(parm){
        var url;
        var params={};
        if(1==parm){
            var mediaName = $.trim($('#mediaNameOne').val());
            url = 'Media/insert';
            params = {
                "mediaName": mediaName
            }
        }else if(2==parm){
            var pid = $.trim($('#mediaOne option:selected').val());
            var mediaName =$.trim($('#mediaNameTwo').val());
            url = 'Media/insert';
            params = {
                "pid": pid,
                "mediaName": mediaName
            }

        } else if(3==parm){
            var projectName= $.trim($('#projectName1').val());
            url = '/Project/insert';
            params = {
                "projectName": projectName
            }
        }else if(4==parm){
            var unitName= $.trim($('#unitName1').val());
            url = '/Unit/insert';
            params = {
                "unitName": unitName
            }
        }else if(5==parm){
            var mid = $.trim($('#mediaNameTwo1 option:selected').val());
            var projectName = $.trim($('#projectName option:selected').val());
            var minimum=$.trim($('#minimum').val());
            var maximum=$.trim($('#maximum').val());
            var unitName = $.trim($('#unitName option:selected').val());
            var state=$.trim($('#state').val());
            url = '/MediaOrProject/insert';
            params = {
                "mid": mid,
                "projectName": projectName,
                "minimum": minimum,
                "maximum": maximum,
                "unitName": unitName,
                "state": state
            }
        }else if(6==parm){
            var id=$.trim($('#hdMid').val())
            var mid = $.trim($('#mid').val());
            var projectName = $.trim($('#projectName2').val());
            var minimum=$.trim($('#minimum1').val());
            var maximum=$.trim($('#maximum1').val());
            var unitName = $.trim($('#unitName2').val());
            var state=$.trim($('#state1').val());
            url = '/MediaOrProject/update';
            params = {
                "id": id,
                "mid": mid,
                "projectName": projectName,
                "minimum": minimum,
                "maximum": maximum,
                "unitName": unitName,
                "state": state
            }
        }
        Ter.getApi({
                apiname: url,
                params: params
            },
            function (res) {
                console.log(res);
                if (res.errCode == "SUCCESS") {
                    layer.alert(res.errMsg);

                };
                if(1==parm){
                    $('#myModal1').modal('hide');
                    quality.initTree();
                    quality.loadTable();
                }else if(2==parm){
                    $('#myModal2').modal('hide');
                    quality.initTree();
                    quality.loadTable();
                }else if(3==parm){
                    $('#myModal3').modal('hide');
                    quality.loadTable();
                }else if(4==parm){
                    $('#myModal4').modal('hide');
                    quality.loadTable();
                }else if(5==parm){
                    $('#myModal5').modal('hide');
                    quality.loadTable();
                }else if(6==parm){
                    $('#myModal6').modal('hide');
                    quality.loadTable();
                }

            })
    },
    //加载添加二级介质模态框中的下拉框
    LoadModalSelect: function() {
        $("#mediaOne").empty();
        Ter.getApi({
                apiname: "Media/findByOneMedia"
            },
            function(res) {
                if(res.result) {
                    var select = $("#mediaOne");
                    for(var i = 0; i < res.result.length; i++) {
                        /*if(pid == res.result[i].id) {
                            select.append("<opti    on value='" + res.result[i].id + "' selected='selected'>" +
                                res.result[i].mediaName + "</option>");
                        } else {}*/
                            select.append("<option value='" + res.result[i].id + "'>" +
                                res.result[i].mediaName + "</option>");

                    }
                }
            })
    },
    //加载添加介质属性配置模态框中的介质名下拉框
    LoadModalMediaSelect: function(id) {
        $("#mediaNameTwo1").empty();
        Ter.getApi({
                apiname: "Media/findByTwoMedia"
            },
            function(res) {
                if(res.result) {
                    var select = $("#mediaNameTwo1");
                    for(var i = 0; i < res.result.length; i++) {
                        /*if(pid == res.result[i].id) {
                            select.append("<opti    on value='" + res.result[i].id + "' selected='selected'>" +
                                res.result[i].mediaName + "</option>");
                        } else {}*/
                        select.append("<option value='" + res.result[i].id + "'>" +
                            res.result[i].mediaName + "</option>");

                    }
                }
            })
    },
    //加载添加介质属性配置模态框中的属性名下拉框
    LoadModalProjectSelect: function(id) {
        $("#projectName").empty();
        Ter.getApi({
                apiname: "/Project/findAllProject"
            },
            function(res) {
                if(res.result) {
                    var select = $("#projectName");
                    for(var i = 0; i < res.result.length; i++) {
                        /*if(pid == res.result[i].id) {
                            select.append("<opti    on value='" + res.result[i].id + "' selected='selected'>" +
                                res.result[i].mediaName + "</option>");
                        } else {}*/
                        select.append("<option value='" + res.result[i].projectName + "'>" +
                            res.result[i].projectName + "</option>");

                    }
                }
            })
    },
    //加载添加介质属性配置模态框中的单位下拉框
    LoadModalUnitSelect: function(id) {
        $("#unitName").empty();
        Ter.getApi({
                apiname: "/Unit/findAllUnit"
            },
            function(res) {
                if(res.result) {
                    var select = $("#unitName");
                    for(var i = 0; i < res.result.length; i++) {
                        /*if(pid == res.result[i].id) {
                            select.append("<opti    on value='" + res.result[i].id + "' selected='selected'>" +
                                res.result[i].mediaName + "</option>");
                        } else {}*/
                        select.append("<option value='" + res.result[i].unitName + "'>" +
                            res.result[i].unitName+ "</option>");

                    }
                }
            })
    },
    btnDelete: function(id) {
        layer.confirm("确认要删除？", {
                btn: ['确定', '取消'],
                title: "提示"
            },
            function() {
                var dataStr = {
                    "id": id
                };
                Ter.getApi({
                        apiname: '/MediaOrProject/delete',
                        params: dataStr
                    },
                    function(res) {
                        if(res.errCode == "SUCCESS") {
                            layer.alert(res.errMsg)
                            window.location.reload();
                            quality.loadTableData();
                        }
                    })
            }
        )

    },
    btnEdit:function(MediaOrProject){
        //alert(obj.id);

        var row = MediaOrProject;
        console.log(row);
        $("#myModal6").modal("show");
        $('#hdMid').val(row.id);
        $('#mid').val(row.mid);
        $('#mediaName').val(row.mediaName);
        $('#projectName2').val(row.projectName);
        $('#minimum1').val(row.minimum);
        $('#maximum1').val(row.maximum);
        $('#unitName2').val(row.unitName);
        $('#state1').val(row.state);

    },
}
//初始化
$(function () {
    quality.init();
})