var map = new BMap.Map("container");
$(function(){
    var pt = new BMap.Point(116.404, 39.915);//定位
    map.centerAndZoom(pt,18);
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
    var selfID = 0;
    $.ajax({
        'url':"checkStatus",
        async:false,
        success:function(data){
            data = JSON.parse(data);
            $("#time").text(data.time+":00");
            var sp = data["startpoint"].split(",");
            var ep = data["endpoint"].split(",");
            var pStart = new BMap.Point(parseFloat(sp[0]),parseFloat(sp[1]));
            var pEnd = new BMap.Point(parseFloat(ep[0]),parseFloat(ep[1]));
            var rectangle = new BMap.Polygon([
                new BMap.Point(pStart.lng,pStart.lat),
                new BMap.Point(pEnd.lng,pStart.lat),
                new BMap.Point(pEnd.lng,pEnd.lat),
                new BMap.Point(pStart.lng,pEnd.lat)
            ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});  //创建矩形
            rectangle.setFillOpacity(0.1);
            map.addOverlay(rectangle);         //增加矩形

            console.log(data["self"]);
            selfID = data["self"];

            var b = new BMap.Bounds(pStart,pEnd);
            try {
                BMapLib.AreaRestriction.setBounds(map, b);
            } catch (e) {
                alert(e);
            }
        }
    });

    var position = null;
    var failtimes = 0;
    setInterval(function(){
        $.ajax({
            url:'chat',
            success:function(data){
                data = JSON.parse(data);
                if(data != null){
                    $.each(data,function(index,value){
                       if(value[1] == "systemInfo"){
                           $("#chatArea").append("<span class='system'>[系统消息]"+value[0]+"</span>");
                       } else{

                       }
                    });
                }
            }
        });
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus() == BMAP_STATUS_SUCCESS){
                position = r.point;
                failtimes = 0;
            }
            else {
                failtimes ++;
                if(failtimes > 5){
                    $("#chatArea").append("<span class='system'>[系统消息]定位信息失效,请检查网络设置,刷新后重试</span>");
                }
            }
        },{enableHighAccuracy: true})
        $.ajax({
            url:"gameCheck",
            data:{
              'x':position.lng,
              'y':position.lat
            },
            success:function(data){
                data = JSON.parse(data);
                map.clearOverlays();
                var team = 0;
                $.each(data,function(index,value){
                    var pt = value["position"].split(",");
                    pt = new BMap.Point(pt[0], pt[1]);
                    if(value["uid"] == selfID){
                        myPoint = pt;
                        var myIcon = new BMap.Icon(imgSrc+"/self.png", new BMap.Size(18,18));
                        var self = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
                        map.addOverlay(self);
                        $("#hp").text(value["hp"]);
                        $("#attack").text(value["attack"]);
                        team=value["team"];
                    }else if(value["team"] == team){
                        var myIcon = new BMap.Icon(imgSrc+"/partner.png", new BMap.Size(18,18));
                        var part = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
                        map.addOverlay(part);
                    }else if(value["team"] != team){
                        var distance = map.getDistance(pt,position).toFixed(2);
                        if(distance < 100){
                            var myIcon = new BMap.Icon(imgSrc+"/enemy.png", new BMap.Size(18,18));
                            var part = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
                            map.addOverlay(part);
                        }
                        if(distance < 50){
                            meetEnemy(value);
                        }
                    }
                });
            }
        })
    },1000);
});
function meetEnemy(enemy){
    $.ajax({
        url:"attack",
        data:{

        }
    });
}