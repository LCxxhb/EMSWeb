var GasReport = {
	init: function() {
		this.initDate(); //日期初始化
		this.calcTableHeight();
		this.initTable();
		this.getFactory();
	},
	initDate: function() {
		//日开始
		jeDate("#startInstantDate", {
			onClose: false,
			isinitVal: true,
			isClear: false,
			initDate: jeDate.nowDate(),
			maxDate: jeDate.nowDate(),
			theme: {
				bgcolor: "#0196c9",
				pnColor: "#00CCFF"
			}, //主题色
			format: "YYYY-MM-DD hh:mm:ss",
			zIndex: 3000,
			isTime: true
		});
		//日结束
		/*jeDate("#endInstantDate", {
		    onClose: false,
		    isinitVal: true,
		    isClear: false,
		    initDate: jeDate.nowDate(),
		    maxDate: jeDate.nowDate(),
		    theme: {bgcolor: "#0196c9", pnColor: "#00CCFF"},//主题色
		    format: "YYYY-MM-DD hh:mm:ss",
		    zIndex: 3000,
		    isTime: true
		});*/

	},
	calcTableHeight: function() {
		var t_height = $(".content-wrapper").height() - $(".page-btns-box").outerHeight();
		$(".page-main-box").outerHeight(t_height);
		return t_height - 50;
	},

	initTable: function() {
		var self = this;
		$('#instantTable').bootstrapTable({
			height: self.calcTableHeight(),
			/*search: false,
			pagination: true,
			pageSize: 15,
			pageNumber: 1, //初始化加载第一页，默认第一页,并记录*/
			striped: true, //隔行变色
			columns: [{
				field: 'factory',
				title: '分厂',
				align: 'center'
			}, {
				field: 'area',
				title: '区域',
				align: 'center'
			}, {
				field: 'point',
				title: '采集点',
				align: 'center'
			}, {
				field: 'describe',
				title: '采集点描述',
				align: 'center'
			},{
				field: 'medium',
				title: '介质类型',
				align: 'center'
			}, {
				field: 'type',
				title: '产出/消耗',
				align: 'center'
			}, {
				field: 'value',
				title: '产出/消耗量',
				align: 'center'
			}, {
				field: 'time',
				title: '日期',
				align: 'center'
			}],
			data: [{
				factory: '炼铁厂',
				area: '煤气液化炉',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼铁厂',
				area: '1#高炉',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼铁厂',
				area: '2#高炉',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼铁厂',
				area: '3#热风炉',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼铁厂',
				area: '球团',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼铁厂',
				area: '白灰',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼铁厂',
				area: '20000制氧',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼铁厂',
				area: '6000制氧',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼铁厂',
				area: '3#高炉富氧',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼钢厂',
				area: '炼钢氧气',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}, {
				factory: '炼钢厂',
				area: '轧钢氧气',
				point: '',
				describe: '',
				medium: '',
				type: '',
				value: '',
				time: ''
			}]
		});
	},
	getFactory: function() {
		var factorys = ["炼铁厂", "炼钢厂", "轧钢厂", "外单位"];
		window.onload = start;
		var gf = document.getElementById("gasFactory");

		function start() {
			for(var i = 0; i < factorys.length; i++) {
				var op = document.createElement("option");
				op.innerHTML = factorys[i];
				gf.appendChild(op); //添加可选择的分厂到第一个选项下拉栏
			}
		}
	},
	getArea: function() {
		var areas = [
			["球团", "炼铁老区", "回转窑"],
			["连铸作业区", "供辅作业区", "炼钢作业区"],
			["3350轧钢作业区", "3800轧钢作业区"],
			["外单位"]
		];
		var gf = document.getElementById("gasFactory");
		var ga = document.getElementById("gasArea");
		ga.length = 1;
		var fl = gf.selectedIndex; //找到分厂位置，从而好使后面的区域与分厂对应
		var fa = areas[fl - 1]; //先把所选分厂在数组中的位置找出来，确定是哪个分厂的几个区域
		for(var j = 0; j < fa.length; j++) {
			var op1 = document.createElement("option");
			op1.innerHTML = fa[j];
			ga.appendChild(op1);
		}
	},
	/*getShop: function() {
		var shops = [
			[
				["1#窑", "2#窑", "3#窑"],
				["1#高炉", "2#高炉"],
				["回转窑"]
			],
			[
				["烤包"],
				["脱硫", "煤气柜"],
				["转炉"]
			],
			[
				["1#加热炉", "5#加热炉"],
				["均热坑", "加热炉"]
			],
			[
				["成飞", "特材"]
			],
		];
		var gf = document.getElementById("gasFactory");
		var ga = document.getElementById("gasArea");
		var gs = document.getElementById("gasShop")
		gs.length = 1;
		var fl = gf.selectedIndex;
		var al = ga.selectedIndex;
		var fa = shops[fl - 1];
		var fas = fa[al - 1];
		for(var k = 0; k < fas.length; k++) {
			var op2 = document.createElement("option");
			op2.innerHTML = fas[k];
			gs.appendChild(op2);
		}
	},*/
};
$(function() {
	GasReport.init();
});