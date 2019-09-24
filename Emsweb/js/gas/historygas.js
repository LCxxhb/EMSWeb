var historygas = {
	init: function() {
		historygas.loadTable();
	},
	loadTable: function() {

		$('#mytable').bootstrapTable({
			search: false,
			pagination: true,
			pageSize: 10,
			pageList: [5, 10, 15, 20],

			showColumns: true,
			showRefresh: true,
			showToggle: true,
			locale: "zh-CN",
			striped: true,
			url: '1.json',
			columns: [{
				field: 'id',
				title: 'ID'
			}, {
				field: 'areaName',
				title: '区域'
			}, {
				field: 'customProperties',
				title: '自定义属性'
			}, {
				field: 'description',
				title: '变量描述'
			}, {
				field: 'tagType',
				title: '采集点类型'
			}, {
				field: 'useType',
				title: '统计类型'
			}, {
				field: 'dataType',
				title: '数据类型'
			}, {
				field: 'driveName',
				title: '驱动名称'
			}, {
				field: 'deviceName',
				title: '设备名称'
			}, {
				field: 'deviceAddress',
				title: '设备地址'
			}, {
				field: 'scanMechanism',
				title: '扫描机制'
			}, {
				field: 'scanCycle',
				title: '扫描周期'
			}, {
				field: 'scanOhase',
				title: '扫描相位'
			}, {
				field: 'admitControl',
				title: '允许控制'
			}, {
				field: 'admitScan',
				title: '允许扫描'
			}, {
				field: 'useRangeTransform',
				title: '启用量程转换'
			}, {
				field: 'projectUnit',
				title: '工程单位'
			}, {
				field: 'projectZero',
				title: '工程量零量程'
			}, {
				field: 'projectFull',
				title: '工程量满量程'
			}, {
				field: 'projectStartZero',
				title: '原始量零量程'
			}, {
				field: 'projectStartFull',
				title: '原始量满量程'
			}, {
				field: 'admitZeroImpaction',
				title: '允许零点嵌位'
			}, {
				field: 'zero',
				title: '零点'
			}, {
				field: 'floatingValue',
				title: '浮动值'
			}, ]
		});
	},

	//文件导入
	Import: function() {
		// 导入模板
		$('#userImport').click();
		historygas.uploadFiles();
		// 导入模板后上传附件
		//		当隐藏域input获取焦点后， 触发onchange事件

	},
	uploadFiles: function() {
		debugger;
	
		//			判断文件是否为空
//		if($('#userImport').get(0).files[0]) {
//			alert("文件为空请重新选择！")
//			return
//		}
		var file = new FormData();
      
		file.append('file', $('#userImport')[0].files[0]);
		var jsonStr ={'file':file,'type':'gas'};
		//加载层  在文件上传中出现
		var load_cover = layer.load(0, {
			shade: [0.3, '#fff']
		});
		console.log(jsonStr);
		$.ajax({
			url: baseurl + '/project/projectUpload',
			type: 'POST',
			cache: false,
			data: jsonStr,
			processData: false,
			contentType: false
		}).done(function(res) {
			if(res.code == 0) {
				alert(res.msg);
				//刷新
				$('#mytable').bootstrapTable('refresh');
			} else {
				alert(res.msg);
			}
			//				ajax执行完成， 即文件上传文成， 关闭加载层
			layer.close(load_cover);
			//console.log(res);
		}).fail(function(res) {
			//				ajax执行完成， 即文件上传文成， 关闭加载层
			layer.close(load_cover);
			layer.alert(res.message);
		});
	}
}

$(function() {
	historygas.init();
})