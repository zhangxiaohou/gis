<?php if (!defined('THINK_PATH')) exit();?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=0.5, maximum-scale=2.0, user-scalable=yes" />
    <title>gis</title>
    <script type="text/javascript" name="baidu-tc-cerfication" data-appid="8283716" src="http://apps.bdimg.com/cloudaapi/lightapp.js"></script>

    <link  href="/gis/Application/Home/View/Public/css/toastmessage.css" type="text/css"  rel="stylesheet" />
    <link  href="/gis/Application/Home/View/Public/css/bootstrap.min.css" type="text/css"  rel="stylesheet" />


     <script src="/gis/Application/Home/View/Public/js/jquery.min.js"></script>
    <script src="/gis/Application/Home/View/Public/js/bootstrap.min.js"></script>
    <script src="/gis/Application/Home/View/Public/js/toastmessage.js"></script>


<link rel="stylesheet" type="text/css" href="login/default.css">

<!--必要样式-->
<link rel="stylesheet" type="text/css" href="/gis/Application/Home/View/Public/css/login/styles.css">

</head>
<body>

<div class='login'>
    <div class='login_title'>
        <span>房间登录</span>
    </div>
    <div class='login_fields'>
        <div class='login_fields__user'>
            <div class='icon'>
                <img src='/gis/Application/Home/View/Public/img/login/user_icon_copy.png'>
            </div>
            <input placeholder='您的名称' required id="name" type='text'>
            <div class='validation'>
                <img src='/gis/Application/Home/View/Public/img/login/tick.png'>
            </div>
            </input>
        </div>
        <div class='login_fields__password'>
            <div class='icon'>
                <img src='/gis/Application/Home/View/Public/img/login/lock_icon_copy.png'>
            </div>
            <input placeholder='房间号' id="roomId" type='text'>
            <div class='validation'>
                <img src='/gis/Application/Home/View/Public/img/login/tick.png'>
            </div>
        </div>
        <div class='login_fields__submit'>
            <input type='submit' value='登入'>
        </div>
    </div>
    <div class='success'>
        <h2>登入成功</h2>
        <p>欢迎加入</p>
    </div>
    <div class='disclaimer'>
        <p>未被创建的房间将被创建。</p>
    </div>
</div>
<div class='authent'>
    <p>认证中...</p>
</div>

<script type="text/javascript" src='/gis/Application/Home/View/Public/js/login/stopExecutionOnTimeout.js'></script>
<script>
    $('input[type="submit"]').click(function () {
      if($("#name").val() == ''){
        touming("请输入您的昵称");
        return false;
      }
      if($("#roomId").val() == ''){
        touming("请输入您想加入/创建的房间号");
        return false;
      }
      if(isNaN($("#roomId").val())){
        touming("房间号必须为数字，请输入正确格式的房间号");
        return false;
      }
        $('.login').addClass('test');
        setTimeout(function () {
            $('.login').addClass('testtwo');
        }, 300);
        setTimeout(function () {
            $('.authent').show().animate({ right: -320 }, {
                duration: 600,
                queue: false
            });
            $('.authent').animate({ opacity: 1 }, {
                duration: 200,
                queue: false
            }).addClass('visible');
        }, 100);
        setTimeout(function () {
            $('.authent').show().animate({ right: 90 }, {
                duration: 600,
                queue: false
            });
            $('.authent').animate({ opacity: 0 }, {
                duration: 200,
                queue: false
            }).addClass('visible');
            $('.login').removeClass('testtwo');
        }, 1000);
        $.ajax({
		        url:'loginIn',
		        data:{
			          'name':$("#name").val(),
                'roomId':$("#roomId").val()
		        },
		        type:'post',
		        success:function(data){
                console.log(data);
                if(data != "0"){
                  $('.login').removeClass('test');
                  $('.login div').fadeOut(123);
                  $('.success').fadeIn();
                  setTimeout(function () {
                    location.href = data;
                  }, 1000);
                }else{
                    touming("您的昵称在该房间内已存在");
                    setTimeout(function () {
                      location.reload();
                    }, 1000);
                }

		        }
	      });
    });
    $('input[type="text"],input[type="password"]').focus(function () {
        $(this).prev().animate({ 'opacity': '1' }, 200);
    });
    $('input[type="text"],input[type="password"]').blur(function () {
        $(this).prev().animate({ 'opacity': '.5' }, 200);
    });
    $('input[type="text"],input[type="password"]').keyup(function () {
        if (!$(this).val() == '') {
            $(this).next().animate({
                'opacity': '1',
                'right': '30'
            }, 200);
        } else {
            $(this).next().animate({
                'opacity': '0',
                'right': '20'
            }, 200);
        }
    });
    var open = 0;
    $('.tab').click(function () {
        $(this).fadeOut(200, function () {
            $(this).parent().animate({ 'left': '0' });
        });
    });
</script>

<div style="text-align:center;">
</div>


</body>
</html>