<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
    <title>gis</title>
    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=uoe6xXST66ou1s1fUITaH5iGel4FitgN">
    </script>
    <link  href="/gis/Application/Home/View/Public/css/toastmessage.css" type="text/css"  rel="stylesheet" />
    <link type="text/css" href="/gis/Application/Home/View/Public/css/indexCss.css" rel="stylesheet" />


     <script src="/gis/Application/Home/View/Public/js/jquery.min.js"></script>
    <script src="/gis/Application/Home/View/Public/js/bootstrap.min.js"></script>
    <script src="/gis/Application/Home/View/Public/js/toastmessage.js"></script>


<link  href="/gis/Application/Home/View/Public/css/bootstrap.min.css" type="text/css"  rel="stylesheet" />
<link  href="/gis/Application/Home/View/Public/css/chat.css" type="text/css"  rel="stylesheet" />

<script type="text/javascript" src="http://api.map.baidu.com/library/AreaRestriction/1.2/src/AreaRestriction_min.js"></script>
<style>
    .main{background:url(/gis/Application/Home/View/Public/img/indexImg/bg.png);}
    #container{height:80%}
</style>
</head>
<body class="main">
<div  style="height: 100%">
            <div id="container"></div>
            <table class="infoDiv" style="width:100%;height: 20%">
                <tr><td style="width: 80%">
                    <div class="divchat" id="chatArea"></div>
                </td><td style="width: 20%" >  <div class="infoDiv container" style="width: 100%;height:100%" id="infoArea">
                    <div><img src="/gis/Application/Home/View/Public/img/time.jpg" style="height: 20px"/><span id="time"></span></div>
                    <div> <img src="/gis/Application/Home/View/Public/img/hp.jpg" style="height: 20px"/><span id="hp">20</span>
                    <div><img src="/gis/Application/Home/View/Public/img/attack.jpg" style="height:20px;width: 20px"/><span id="attack">1</span>
                    <div><img src="/gis/Application/Home/View/Public/img/boom.jpg" style="height: 20px"/><span id="gain" >0/0/0</span>

                </div> </td></tr>
            </table>


            <script>
            </script>
    </div>
<script>
    var imgSrc = "/gis/Application/Home/View/Public/img";
</script>
<script src="/gis/Application/Home/View/Public/js/game.js"></script>

</body>
</html>