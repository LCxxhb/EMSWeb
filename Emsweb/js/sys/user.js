var userpage = {
    init: function() {
        userpage.loadTable();
        /*userpage.loadSlect();*/
    },
    loadTable:function(){

        $('#mytable').bootstrapTable({
            search: false,
            pagination: true,
            pageSize: 10,
            pageList: [10, 20, 50],
            showColumns: true,
            showRefresh: true,
            showToggle: true,
            locale: "zh-CN",
          /*  uniqueId: "aid", //每一行的唯一标识，一般为主键列*/
            pageNumber: 1, //初始化加载第一页，默认第一页,并记录
            contentType: "application/x-www-form-urlencoded", //发送到服务起的数据编码类型
            striped: true,
            url: '1.json',
            columns: [{
                checkbox: true,
                visible: true
            },{
                field: 'id',
                title: 'id',
                align: 'center'
            },{
                field: 'username',
                title: '用户名称',
                align: 'center'
            }, {
                field: 'role_id',
                title: '角色',
                align: 'center'
            }, {
                field: 'status',
                title: '状态',
                align: 'center'
            },{
                field:'create_by',
                title:'创建人',
                align: 'center'
            },{
                field:'create_date',
                title:'创建时间',
                align: 'center'
            },{
                field:'last_update_by',
                title:'最后更新人',
                align: 'center'
            },{
                field:'last_update_date',
                title:'最后更新时间',
                align: 'center'
            }, {
                field: 'cz',
                title: '操作',
                /* formatter: action,*/
                align: 'center'
            }],
            onLoadSuccess: function() {},
            onLoadError: function() {
                alert("数据加载失败！");
            },
        });
    }
}
$(function() {
    userpage.init();
});


