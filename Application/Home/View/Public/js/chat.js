var map = new BMap.Map("container");
$(function(){
    //在container容器中创建一个地图,参数container为div的id属性;
    var point = new BMap.Point(116.404, 39.915);//定位
    map.centerAndZoom(point,15);				//将point移到浏览器中心，并且地图大小调整为15;
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
    var id = 0;
    $("#chatArea").append("<div><i>请按左下角定位按钮,并选择一个坐标作为游戏开始地点,确认之后</i><button class='btn-info' onClick='setArea();'>点击此处</button>&nbsp;&nbsp;&nbsp;<button class='btn-danger'>点此撤销</button></div>");
    
    setInterval(function(){
        $.ajax({
            url:'chat',
            data:{
                id:id
            },
            success:function(data){
                console.log(data);
        }
    })
    },50000);

});
function setArea(){
    map.removeEventListener("click", clickToStart);
    $("#infoArea").append("您选定的地区为:<span></span>");
    map.addEventListener("click", drawArea);
}
function setStartPoint(){
    map.addEventListener("click", clickToStart);
}
var point = new Array();
function drawArea(e){
    point['x'] = e.point.lng;
    point['y'] = e.point.lat;
    console.log(point);
}
function clickToStart(e){
    point['x'] = e.point.lng;
    point['y'] = e.point.lat;
    console.log(point+"ee");
}