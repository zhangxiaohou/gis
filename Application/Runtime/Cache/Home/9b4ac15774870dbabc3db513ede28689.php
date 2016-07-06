<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
    <title>gis</title>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=uoe6xXST66ou1s1fUITaH5iGel4FitgN">
    </script>
    <link  href="/gis/Application/Home/View/Public/css/toastmessage.css" type="text/css"  rel="stylesheet" />
    <link  href="/gis/Application/Home/View/Public/css/bootstrap.min.css" type="text/css"  rel="stylesheet" />
    <link type="text/css" href="/gis/Application/Home/View/Public/css/indexCss.css" rel="stylesheet" />


     <script src="/gis/Application/Home/View/Public/js/jquery.min.js"></script>
    <script src="/gis/Application/Home/View/Public/js/bootstrap.min.js"></script>
    <script src="/gis/Application/Home/View/Public/js/toastmessage.js"></script>



<style>
    .main{background:url(/gis/Application/Home/View/Public/img/indexImg/bg.png);}
    #container{
        height:1000px;
        width:1000px;
    }
</style>
</head>
<body class="main">
<div class="container" style="height: 100%">
        <?php if($leader == 1): ?><div id="container"></div>
            <script type="text/javascript">
                var map = new BMap.Map("container");//在container容器中创建一个地图,参数container为div的id属性;
                var point = new BMap.Point(116.404, 39.915);//定位
                map.centerAndZoom(point,15);				//将point移到浏览器中心，并且地图大小调整为15;

                <!--以后只需要在此处添加代码即可-->
            </script>
            <?php else: ?>
            <script>
                $(function(){
                    touming("游戏已开始,请等待房主配置游戏参数",true);
                })
            </script><?php endif; ?>
    </div>
<script>
    $(function(){

    })
</script>

</body>
</html>