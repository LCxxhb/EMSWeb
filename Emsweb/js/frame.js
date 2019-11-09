/**
 * 框架页功能
 * **/
var Terframe = {
    powerItem: [],
    tabdoc: '',
    init: function () {
        this.initVal();
        this.treeFold();
        this.menuHover();
        this.calcMaxHeight();
        this.menuOpen();
        this.calcTab();
        this.menuClcik();
        this.switchTab();
        this.closeTab();
        this.refreshTab();
        this.pageResize();
		//this.menuInit();
    },
    //初始化值
    initVal: function () {
        this.initWidth = $(".navbar-tab-item").outerWidth();
        this.frames_arr = [];
    },
    ////左侧目录切换展开折叠
    treeFold: function () {
        $(".sidebar-fold").on('click', function () {
            if (!$(this).hasClass('active')) {
                $(this).addClass('active');//给当前元素增加一个状态标示
                $(this).children().removeClass('fa-rotate-90');//图标旋转90度
                $(".ter-sidebar").css('width', '50px');
                $(".ter-mainContainer").css('padding-left', '50px');
                // $(".ter-sidebar").animate({'width':'50'},300);
                // $(".ter-mainContainer").animate({'padding-left':'50px'},300);
                $(".title-name").hide();//一级菜单名称隐藏
                $(".trans-name").hide();//二级菜单名称隐藏
            } else {
                $(this).removeClass('active');//去掉状态标示
                $(this).children().addClass('fa-rotate-90');
                $(".ter-sidebar").css('width', '210px');
                $(".ter-mainContainer").css('padding-left', '210px');
                // $(".ter-sidebar").animate({'width':'210px'},300);
                // $(".ter-mainContainer").animate({'padding-left':'210px'},300);
                $(".title-name").show();//一级菜单名称隐藏
                $(".trans-name").show();//二级菜单名称隐藏

            }
        });
    },
    //左侧目录宽度为50时鼠标移入显示title事件
    menuHover: function () {
        //一级菜单hover事件     
        $(".sidebar-navList").on("mouseover", ".sidebar-title", function (e) {
            menuHover($(this));
        }).on("mouseout", ".sidebar-title", function () {
            $(".ter-tool").hide();
        });
        // //二级菜单hover事件
        $(".sidebar-navList").on("mouseover", ".sidebar-trans-item", function () {
            menuHover($(this));
			$(this).addClass('active');//将自身状态激活
        }).on("mouseout", ".sidebar-trans-item", function () {
			$(this).removeClass('active');//将自身状态激活
            $(".ter-tool").hide();
        });
        //鼠标移入事件
        function menuHover(self) {
            if ($(".sidebar-fold").hasClass('active')) {
                var offset_val = self.offset().top - 51//body定位，减去头部用掉的51px
                var text_val = self.find("[class$=-name]").text()
                $(".ter-tool").show().css('top', offset_val + 'px').html(text_val);
            }
        }
    },
    //计算左侧目录可滚动的最大高度
    calcMaxHeight: function () {
        var t_height = $(".ter-sidebar").height() - $(".sidebar-fold").height();//计算得到目录区域可用的最大高度
        var realHeight = $(".sidebar-navItem").length * 40;//实际目录区域的高度，每一个一级标题的高度是40*一级标题的个数。
        //得到展开的时候可用的最大高度
        (t_height - realHeight) < 80 ? this.left_scroll_height = 80 + 'px' : this.left_scroll_height = (t_height - realHeight) + 'px'
    },
	menuInit:function(){
		if($(".sidebar-title")[0]!=undefined){
			$(".sidebar-title")[0].click();
		}
	},
    ////展开二级目录事件
    menuOpen: function () {
        $(".sidebar-navList").on('click', '.sidebar-title', function (e) {
            if ($(this).children('.title-icon').hasClass('title-icon-active')) {
                $(this).children('.title-icon').removeClass('title-icon-active');
                $(this).next().animate({ 'max-height': '0px' }, 120)
            } else {
                $(this).next().mCustomScrollbar("destroy");
                //其它兄弟元素激活的隐藏
                $(this).parent().siblings().find('.title-icon-active').removeClass('title-icon-active');
                $(this).parent().siblings().find('.sidebar-trans-list').animate({ 'max-height': '0px' }, 120);
                //将点击的激活
                $(this).children('.title-icon').addClass('title-icon-active');
                $(this).next().animate({ 'max-height': Terframe.left_scroll_height }, 120);
                $(this).next().mCustomScrollbar({
                    set_maxheight: Terframe.left_scroll_height,
                    setTop: 0,
                    scrollInertia: 150,
                    mouseWheel: {
                        enable: true,
                        invert: false
                    },
                });
            }
        });
    },
    //计算每个标签栏的宽度
    calcTab: function () {
        this.tabNum = $('.navbar-tab-item').length;
        this.totalWidth = $(".navbar-tab-box").outerWidth();
        var calcWidth = Math.floor(this.totalWidth / this.tabNum);
        if ((calcWidth) < this.initWidth) {
            $(".navbar-tab-item").outerWidth(calcWidth + 'px');
        } else {
            $(".navbar-tab-item").outerWidth(this.initWidth + 'px');
        }
    },
    //点击目录增加/切换标签页和iframe事件
    menuClcik: function () {
        var self = this;
        $(".sidebar-navList").on('click', '.sidebar-trans-item', function (e) {
            $('.sidebar-navList .sidebar-trans-item').removeClass('active');
            $(this).addClass('active');//将自身状态激活
            var t_url = $(this).attr('data-url');//获取url
            var t_name = $(this).find('.trans-name').text();//获取名称
            self.frameEvent(t_url, t_name);
        });
    },
    frameEvent: function (t_url, t_name) {
        var self = this;
        if ($.inArray(t_name, self.frames_arr) < 0) {//没有找到返回-1,执行新增操作
            self.frames_arr.push(t_name);//如果是新增就放入iframe数组中
            self.addFrame(t_url, t_name);//
        } else {//////执行激活active操作
            self.switchFrame(t_name);
        }
    },
    //增加iframe
    addFrame: function (url, name) {
        this.tabNum++;
        $(".iframe-wrapper iframe").hide();//先将其它的iframe都隐藏掉
        $(".navbar-tab-box .navbar-tab-item").removeClass('active');
        var t_iframe = '<iframe class="embed-responsive-item" id="iframe' + name + '" src=' + url + ' frameborder="0" style="width:100%;height:100%;"></iframe>';
        var t_tab = '<div class="navbar-tab-item active" id="tab' + name + '"><div class="tabText">' + name + '</div><a class="tabClose" href="javascript:;"><i class="add-icon close-icon"></i></a></div>';
        $(".iframe-wrapper").append(t_iframe);
        $(".navbar-tab-box").append(t_tab);
        this.calcTab();//
       // this.checkBtnVisible(name);
    },
    //切换iframe
    switchFrame: function (tabName) {
        $(".navbar-tab-box").children().each(function () {
            if ($(this).children('.tabText').html() == tabName) {
                $(this).addClass('active');
                $("#iframe" + this.id.replace("tab", "")).show();
            } else {
                $(this).removeClass('active');
                $("#iframe" + this.id.replace("tab", "")).hide();
            }
        });
    },
    //切换标签页
    switchTab: function () {
        var self = this;
        $(".navbar-tab-box").on('click', '.navbar-tab-item', function (e) {
            var tab_name = $(this).children('.tabText').html();
            self.switchFrame(tab_name);
        });
    },
    //关闭标签页
    closeTab: function () {
        var self = this;
        $(".navbar-tab-box").on('click', '.tabClose', function (e) {
            e.stopPropagation();//阻止事件向上冒泡，影响父元素切换功能
            var prev_name = $(this).parent().prev().children('.tabText').html();//先获取到当前点击标签页的上一个
            var del_name = $(this).prev().html();//要删除的的标签name
            var del_id = $(this).parent().attr('id');//获取到删除的标签id
            $(this).parent().remove();//删除tab
            $("#iframe" + del_id.replace("tab", "")).remove();//删除iframe
            self.calcTab();
            self.tabNum--;//打开的标签页数量减少
            self.switchFrame(prev_name);//前一个显示
			
            var pos=$.inArray(del_name,self.frames_arr);
            self.frames_arr.splice(pos,1);
            //self.frames_arr.remove(del_name);//从已经激活的选项卡数组的将其删除
        })
    },
    //刷新标签页
    refreshTab: function () {
        $(".navbar-tab-box").on('click', '.navbar-tab-item.active', function (e) {
            e.stopPropagation();
            var iframeId = $(this).attr('id').replace("tab", "iframe");
            document.getElementById(iframeId).contentWindow.location.reload(true);
        })
    },
    //根据权限分配页面按钮
    checkBtnVisible: function (pname) {
        var btns_arr = [];
        Ter.userInfo.power.forEach(function (value, i) {
            btns_arr.push.apply(btns_arr, value.FunNames);
        });
        var filterData = btns_arr.filter(function (value, i) {
            return value.FunName == pname;
        });
        var iframe = document.getElementById("iframe" + pname);
        iframe.addEventListener("load", function () {
            var doc = $(this).prop('contentWindow').document;
            Ter.frame.tabdoc = doc;////////////赋值
            $(doc).ready(function () {
                $(doc).find(".ter-visibleBtn").hide();
                var operData = filterData[0].OperList;
                Ter.frame.powerItem = operData;  /////////赋值
                $(doc).find(".ter-saveBtn").show();
                if (operData && operData.length > 0) {
                    //不为空执行按钮显示隐藏操作
                    operData.forEach(function (value, i) {
                        var className = ".ter-addBtn";
                        if (value == "修改") className = ".ter-editBtn";
                        else if (value == "删除") className = ".ter-delBtn";
                        else if (value == "分配权限")  className = ".ter-permissioBtn";
                        $(doc).find(className).show();
                    });
                }
            });
        });
    },

    //在tab页面执行添加或修改操作时判断是否隐藏“保存”按钮；此方法供tab页面调用
    CheckSave: function (type) {
        if (type == 0) {
            if ($.inArray("修改", Ter.frame.powerItem) < 0)
                $(Ter.frame.tabdoc).find(".ter-saveBtn").hide();
        } else {
            $(Ter.frame.tabdoc).find(".ter-saveBtn").show();
        }
    },

    //页面大小变化时
    pageResize: function () {
        var self = this;
        $(window).resize(function () {
            self.calcTab();
            self.calcMaxHeight();
        });
    }
}

$(function () {
    Terframe.init();
});