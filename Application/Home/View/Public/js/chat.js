var map = new BMap.Map("container");
$(function(){
    var pt = new BMap.Point(116.404, 39.915);//定位
    map.centerAndZoom(pt,18);				//将point移到浏览器中心，并且地图大小调整为15;
    map.enableScrollWheelZoom();
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            map.panTo(r.point);
        }
        else {
            alert('failed'+this.getStatus());
        }
    },{enableHighAccuracy: true})
    var navigationControl = new BMap.NavigationControl({
        // 靠左上角位置
        anchor: BMAP_ANCHOR_TOP_LEFT,
        // LARGE类型
        type: BMAP_NAVIGATION_CONTROL_LARGE,
        // 启用显示定位
        enableGeolocation: true
    });
    map.addControl(navigationControl);
    // 添加定位控件
    var geolocationControl = new BMap.GeolocationControl();
    geolocationControl.addEventListener("locationSuccess", function(e){
        // 定位成功事件
        $("#startPoint").text("("+e.point.lng+","+e.point.lat+")");
    });
    geolocationControl.addEventListener("locationError",function(e){
        // 定位失败事件
        alert(e.message);
    });
    map.addControl(geolocationControl);
    

    setStartPoint();
    $("#chatArea").append("<div><i>请选择一个坐标作为游戏开始地点,确认之后</i><button class='btn-info' onClick='setArea();'>点击此处</button>&nbsp;&nbsp;&nbsp;<button class='btn-danger'>点此撤销</button></div>");
    


});
function setArea(){
    if(point.x == undefined){
        return false;
    }
    map.removeEventListener("click", clickToStart);
    $("#startPoint").text("("+marker.getPosition().lng+","+marker.getPosition().lat+")");
    $("#chatArea").append("<div><i>您选定的点为:("+point.x+","+point.y+")</i></div>");

    $("#chatArea").append("<div><i>请已开始点作为参考,选取游戏场地右下角坐标,确认之后</i><button class='btn-info' onClick='setEnd();'>点击此处</button>&nbsp;&nbsp;&nbsp;<button class='btn-danger'>点此撤销</button></i></div>");

    $("#infoArea").append("场地右下角坐标:<span id='endPoint'></span>");
    map.addEventListener("click", drawArea);
}
function setStartPoint(){
    map.addEventListener("click", clickToStart);
}
var point = new Array();
var marker = null;
var end = null;
var time = null;
function drawArea(e){
    point['x'] = e.point.lng;
    point['y'] = e.point.lat;
    map.clearOverlays();
    end = new BMap.Marker(new BMap.Point(point.x,point.y)); // 创建点
    map.addOverlay(marker);
    map.addOverlay(end);
}
function clickToStart(e){
    point['x'] = e.point.lng;
    point['y'] = e.point.lat;
    map.clearOverlays();
    marker = new BMap.Marker(new BMap.Point(point.x,point.y)); // 创建点
    map.addOverlay(marker);
}
function setEnd(){
    var pStart = new BMap.Point(marker.getPosition().lng,marker.getPosition().lat);
    var pEnd = new BMap.Point(end.getPosition().lng,end.getPosition().lat);
    $("#endPoint").text("("+end.getPosition().lng+","+end.getPosition().lat+")");
    var rectangle = new BMap.Polygon([
        new BMap.Point(pStart.lng,pStart.lat),
        new BMap.Point(pEnd.lng,pStart.lat),
        new BMap.Point(pEnd.lng,pEnd.lat),
        new BMap.Point(pStart.lng,pEnd.lat)
    ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});  //创建矩形
    map.addOverlay(rectangle);         //增加矩形

    var pointRightTop = new BMap.Point(end.getPosition().lng,point.y);  // 右上角坐标
    var pointLeftButtom = new BMap.Point(point.x,marker.getPosition().lat);  // 左下角

    $("#chatArea").append("<div><i>您选定的场景大小为:"+map.getDistance(marker.getPosition(),pointRightTop).toFixed(2)+"m*"+map.getDistance(marker.getPosition(),pointLeftButtom).toFixed(2)+"m</i></div>");


    var b = new BMap.Bounds(pStart,pEnd);
    try {
        BMapLib.AreaRestriction.setBounds(map, b);
    } catch (e) {
        alert(e);
    }

    $("#chatArea").append("<div><i>请设置游戏时间:<select id='gameTime'>" +
        "<option value='15'>15分钟</option>" +
        "<option value='20'>20分钟</option>" +
        "<option value='25'>25分钟</option>" +
        "<option value='30'>30分钟</option>" +
        "</select><button class='btn-info' onClick='setTime();'>确认</button></i></div>");


}
function setTime(){
    time = $("#gameTime").val();
    $("#chatArea").append("<div><i>您设置的游戏时间为:"+time+"分钟</i></div>");

    $("#infoArea").append("游戏时间:"+time+"分钟");

    $("#chatArea").append("<div><i>确认开始游戏吗?<button class='btn-info' onClick='start();'>确认</button></i></div>");
}
function start(){
    $.ajax({
        url:'startGame',
        data:{
            'endPointX':point.x,
            'endPointY':point.y,
            'startPointX':marker.getPosition().lng,
            'startPointY':marker.getPosition().lat,
            'time':time
        },
        success:function(data){
            if(data != 0){
                location.href=data;
            }else{
                touming("网络错误,请再次确认或刷新后再试");
            }
        }
    })
}