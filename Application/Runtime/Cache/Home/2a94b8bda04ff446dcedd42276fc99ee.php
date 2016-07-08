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
<link type="text/css" href="/gis/Application/Home/View/Public/css/indexCss.css" rel="stylesheet" />
<style>
    .main{background:url(/gis/Application/Home/View/Public/img/indexImg/bg.png); width:100%; text-align:center; margin-left:auto; margin-right:auto; bottom:0px; overflow:hidden; }
</style>
</head>
<body class="main">

<div class="t1">
    <span class="qp">房主:<?php echo ($leader["name"]); ?></span>
    <table border="1" width="50%" cellpadding="0" cellspacing="0" class="main_1">
        <tr >
            <td >红方
            </td>
            <td >蓝方
            </td>
        </tr>
        <?php $__FOR_START_596569639__=0;$__FOR_END_596569639__=5;for($i=$__FOR_START_596569639__;$i < $__FOR_END_596569639__;$i+=1){ ?><tr class="team">
                <td class="red">
                   &nbsp; <?php if($red[$i]): echo ($red[$i][name]); endif; ?>
                </td>
                <td class="blue">
                    &nbsp;  <?php if(isset($blue[$i])): echo ($blue[$i][name]); endif; ?>
                </td>
            </tr><?php } ?>
        <tr ><td colspan="2">未选择队伍的成员:
            <span class="oth"><?php if(is_array($oth)): foreach($oth as $key=>$vo): echo ($vo["name"]); ?>&nbsp;&nbsp;&nbsp;<?php endforeach; endif; ?>
            </span>
        </td></tr>
        <tr >
            <td ><button class="btn-danger" onclick="joinTeam(1);">加入红队</button>
            </td>
            <td ><button class="btn-info" onclick="joinTeam(2);">加入蓝队</button>
            </td>
        </tr>
        <?php if(session('id') == $leader['id']): ?><tr >
                <td colspan="2">
                    <button class="btn-success" onclick="start();">开始游戏</button>
                </td>
            </tr><?php endif; ?>
            </table>
    </div>
</div>
<script>
    $(function(){
        setInterval(function(){
            refreshTeam();
        },1000);
    })
    function joinTeam(team){
        $.ajax({
            url:'joinTeam',
            data:{
                team:team
            },
            success:function(data){
                refreshTeam();
            }
        });
    }
    function refreshTeam(){
        $.ajax({
            url:'refreshTeam',
            success:function(data){
                if(data === "1"){
                    location.href = "<?php echo U('game/index');?>";
                }
                data = JSON.parse(data);
                var red = $(".red");
                red.html("&nbsp;");
                var blue = $(".blue");
                blue.html("&nbsp;");
                var redIndx = 0;
                var blueIndx = 0;
                $(".oth").text(" ");
                $.each(data,function(index,value){
                    if(value.team == 1){
                        red.eq(redIndx).text(value.name);
                        redIndx ++;
                    }else if(value.team == 2){
                        blue.eq(blueIndx).text(value.name);
                        blueIndx ++;
                    }else{
                        $(".oth").html( $(".oth").text() + value.name + "&nbsp;&nbsp;&nbsp;");
                    }
                })
            }
        });
    }
    function start(){
        $.ajax({
            url:'start',
            success:function(data) {
                data = JSON.parse(data);
                if(data[8] == 0){
                    touming(data['info']);
                }
                location.href = "<?php echo U('game/index');?>";
            }
        });
    }
</script>

</body>
</html>