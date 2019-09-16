document.write("<script type='text/javascript' src='http://api.map.baidu.com/api?v=2.0&ak=B582fab5f91b9ad851701f50c2899627'></script>");
document.write("<script type='text/javascript' src='http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js'></script>");

var mapPoint = {};
var BaiduMap = {
    //创建地图 参数 ：地图Id，经度，纬度,级别
    CreatMap: function (mapId, xPoint, yPoint, grade) {
        var map = new BMap.Map(mapId);  //创建Map 实例

        var point = new BMap.Point(xPoint, yPoint);
        //设置中心点及地图级别
        map.centerAndZoom(point, grade);
        map.enableScrollWheelZoom(true); //开启滚轮缩放
        map.enableDragging();  // 开启地图拖拽
        return map;
    },
    //开启地图选点
    SetMapPoint: function (map) {
        var marker;
        //点击地图添加标记
        map.addEventListener("click", function (e) {
            map.clearOverlays();  //清除地图标记
            var point = new BMap.Point(e.point.lng, e.point.lat);
            //var myIcon = new BMap.Icon("/images/Map/ll2.png", new BMap.Size(37, 48));
            marker = new BMap.Marker(point); //创建marker对象 
            map.addOverlay(marker); //在地图中添加marker
            //mapPoint = {
            //    mapXpoint: e.point.lng,
            //    mapYpoint: e.point.lat
            //};
        });
        //return mapPoint;
    },
    // 获取标记坐标
    GetMarkPoint: function (map) {
        var allOverlay = map.getOverlays();
        marker = allOverlay[0];
        //point.lng  point.lat
        return point = marker.getPosition();
    },
    //根据坐标加载地图
    LoadMapPoint: function (mapId, xPoint, yPoint, grade) {
        var map = this.CreatMap(mapId, xPoint, yPoint, grade);
        var point = new BMap.Point(xPoint, yPoint);
        //var myIcon = new BMap.Icon("/images/Map/ll2.png", new BMap.Size(37, 48));
        var marker = new BMap.Marker(point); //创建marker对象 
        map.addOverlay(marker); //在地图中添加marker

        // 点击地图移动标记
        map.addEventListener("click", function (e) {
            map.clearOverlays();  //清除地图标记
            var newpoint = new BMap.Point(e.point.lng, e.point.lat);
            marker = new BMap.Marker(newpoint); //创建marker对象 
            map.addOverlay(marker); //在地图中添加marker
            //mapPoint = {
            //    mapXpoint: e.point.lng,
            //    mapYpoint: e.point.lat
            //};
        });
        return  map;
    }
};