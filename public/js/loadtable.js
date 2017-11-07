$(function () {
    // 初始化table
    var videoTable = new TableInit();
    videoTable.Init();

    // 初始化Button点击事件
    var videoButton = new ButtonInit();
    videoButton.Init();
});

var TableInit = function () {
    var videoTableInit = new Object();
    // 初始化table
    videoTableInit.Init = function () {
        $('#video-table').bootstrapTable({
            url: '/master/videodata',                   //请求后台的URL（*）
            method: 'get',                              //请求方式（*）
            toolbar: '#toolbar',                        //工具按钮用哪个容器
            striped: true,                              //是否显示行间隔色
            cache: true,                                //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                           //是否显示分页（*）
            sortable: true,                             //是否启用排序
            sortOrder: "asc",                           //排序方式
            queryParams: videoTableInit.queryParams,    //传递参数（*）
            sidePagination: "server",                   //分页方式：client客户端分页，server服务端分页（*）
            pageNumber:1,                               //初始化加载第一页，默认第一页
            pageSize: 10,                               //每页的记录行数（*）
            pageList: [10, 25, 50, 100],                //可供选择的每页的行数（*）
            search: true,                               //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: true,                          //是否显示所有的列
            showRefresh: true,                          //是否显示刷新按钮
            minimumCountColumns: 2,                     //最少允许的列数
            clickToSelect: true,                        //是否启用点击选中行
            // height: 500,                             //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "ID",                             //每一行的唯一标识，一般为主键列
            showToggle:true,                            //是否显示详细视图和列表视图的切换按钮
            cardView: false,                            //是否显示详细视图
            detailView: false,                          //是否显示父子表
            showPaginationSwitch:false,                  //是否显示数据条数选择框
            columns: [
                {
                    checkbox: true
                },
                {
                    field: 'id',
                    title: '编号'
                },
                {
                    field: 'title',
                    title: '标题'
                },
                {
                    field: 'date',
                    title: '上传时间'
                },
                {
                    field: 'username',
                    title: '作者'
                },
                {
                    field: 'plays',
                    title: '播放量'
                },
                {
                    field: 'comments',
                    title: '评论量'
                },
                {
                    field: 'coins',
                    title: '硬币数'
                },
                {
                    field: 'collects',
                    title: '收藏量'
                },
            ],
            /*
            data: [
                {
                    "id":16056845,
                    "title":"【JusllyTang】T-ara智妍 - 1分1秒",
                    "date":"2017-11-06 12:00:00",
                    "username":"JusllyTang",
                    "plays":726,
                    "comments":4,
                    "coins":15,
                    "collects":40
                }
            ],
            */
        });
    };

    videoTableInit.queryParams = function (params) {
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            limit: params.limit,   //页面大小
            offset: params.offset,  //页码
            id: $("#txt_search_id").val(),
            title: $("#txt_search_title").val(),
            date: $("#txt_search_date").val(),
            username: $("#txt_search_username").val(),
            plays: $("#txt_search_plays").val(),
            comments: $("#txt_search_comments").val(),
            coins: $("#txt_search_coins").val(),
            collects: $("#txt_search_collects").val(),
        };
        return temp;
    };
    return videoTableInit;
};

var ButtonInit = function () {
    var videoButtonInit = new Object();
    var postdata = {};

    videoButtonInit.Init = function () {
        //初始化页面上面的按钮事件
    };

    return videoButtonInit;
};