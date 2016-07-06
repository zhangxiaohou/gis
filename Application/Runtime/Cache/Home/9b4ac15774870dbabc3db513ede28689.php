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
<style>
    .main{background:url(/gis/Application/Home/View/Public/img/indexImg/bg.png);}
    #container{height:80%}
</style>
</head>
<body class="main">
<div  style="height: 100%">
        <?php if(1 == 1): ?><div id="container"></div>

            <script src="/gis/Application/Home/View/Public/js/chat.js"></script>
            <div class="divchat" id="chatArea"></div>
            <div class="infoDiv" id="infoArea">
                开始地点坐标:<span id="startPoint">(0,0)</span>
            </div>
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