/*下载数和收藏数*/
  function getDownShare() { 
    $.getJSON("http://ajax.ooopic.com/ajax.api.php?id="+obj.picid+"&k="+obj.kid+"&action=showdata&callback=?&t="+(new Date()).getTime(), function (d)
    {
      if($('#dynamicInfo')!=undefined){
        var shoucang = '<span scid="'+obj.picid+'" title="收藏" id="pic_fav">收藏：<span id="currFav">'+d.scnum+'</span></span>';
            // www下VIP浏览页搜藏
            if(obj.pageType != undefined && obj.pageType == "www_show"){
              shoucang = '<span scid="'+obj.picid+'" title="收藏">收藏：<span id="currFav">'+d.scnum+'</span></span>';
            }
            var info = '下载：'+d.dnum+'&nbsp;&nbsp;&nbsp;'+shoucang;
            $("#read_down_info").html(info);
            $("#loading").hide();
            $("#dynamicInfo").show();
        }
      })
   }
$(function(){
  $('.ico_dujia').html('独家');
  $("#pic_play").attr("src",$("#pic_play").attr("src1"));
  //上一页和下一页
  $(".for_prev,.for_next").live("click",function(){
    var current=$(this).attr('name');
    $.getJSON(
      "http://ajax.ooopic.com/get_pn_url.php?picid="+obj.picid+"&kid="+obj.kid+"&action="+current+"&callback=?",
      function(url){
        if(url){
          window.location.href=url;
        }
      }
      );    
  });


             $('.main_zoom').css('height',100000);
              $(window).scroll(function(){       
                      var dotTop = $(document).scrollTop();
                      var gao=$('#pic_first').css('height');
                      var newgao=parseInt(gao);
                      var newimg=$('#bigimages').css('height');
                      var newimggao=(parseInt(newimg)+350);

                      if((dotTop)<(newgao*0.9)){
                           if( (dotTop) >120) {
                            $('#ancho_left,#ancho1_left,#ancho_right,#ancho1_right').css('top',(dotTop)+'px');
                           }
                      }
                
                });  


             $('#ancho_left').hover(function(){
                  $('#ancho1_left').css('opacity',0.5);
               },function(){
                  $('#ancho1_left').css('opacity',0.2);
               });

                $('#ancho_right').hover(function(){
                  $('#ancho1_right').css('opacity',0.5);
               },function(){
                  $('#ancho1_right').css('opacity',0.2);
               });  

    

 //加入购物车
 var stat =false;
 $("#bt_shopcar").live("click", function(){
  var that = $(this);
  var innerHTml = that.html();
  var id= that.attr('pid');
  if( innerHTml == '查看购物车' ){ window.open("http://www.ooopic.com/shopcar/"); return false;}
  if( stat ) return false;
  that.html("正在加入...");
    var banquan=0;  //使用权

    $(".radiotype").each(function(){
      var obj=$(this)[0];
      if(obj.checked==true){
        switch(parseInt($(obj).attr("value2"))){
          case 0: banquan=1;break;//版权
          case 2: banquan=1;break;//版权
        }
      }
    });

    $.getJSON('http://ajax.ooopic.com/shopcar.api.php?action=droporder&b='+banquan+'&pid='+id+'&callback=?&sf='+Math.random(),function(d){
      stat=false;

      if(parseInt(d.datas)==1||parseInt(d.datas)==3||parseInt(d.datas)==6){
        var nowNum = parseInt($("#shopCartNum").html())+1;
        $("#shopCartNum").html(nowNum);
        var tipInnerHtml = '<ul class="ok"><li class="ok_1">添加成功</li><li class="ok_2">购物车总共'+nowNum+'张设计稿</li></ul>';
        that.showTip(1, 0 , 65, tipInnerHtml);
        that.html("查看购物车").attr("href", "http://www.ooopic.com/shopcar/").showTip(1, 0 , 65, tipInnerHtml );
        setTimeout("$('#tipBox').hide();", 1500);
      }else{
       that.html("查看购物车").attr("href", "http://www.ooopic.com/shopcar/");
       setTimeout("$('#tipBox').hide();", 1500);
     }

   });

  });


  //绑定收藏事件
  $("#pic_fav").live('click',function(event){
   var that = $(this);
   if( $('#loading').attr('title')=='none'){
    window.open("http://user.ooopic.com/user/login.php");
    return false;
  } 
   
  var picid = that.attr("scid");
  var r = Math.random();
  var url="http://ajax.ooopic.com/scadd.php?action=add&picid="+picid+"&callback=?&r="+r;
  $.getJSON(url,function(data){
    if( data == '收藏成功'){
      var OffsetTop = that.offset().top;
      var OffsetLeft = that.offset().left;
      var numLeft = OffsetLeft + 20;
      $("body").append("<p id='addOne'>收藏成功</p>");
      $("#addOne").css({"position":"absolute", "left":numLeft+"px", "top": OffsetTop+"px", "color":"#3AA631", "font-size": "22px" })
      .animate({
        top: "-=30px",
        opacity:0.5
      }, 800 ,function(){
       $("#addOne").hide();
       var currFav = parseInt($('#currFav').text())+1;
       $('#currFav').html(currFav);
     });
    }else{
      var OffsetTop = that.offset().top;
      var OffsetLeft = that.offset().left;
      var numLeft = OffsetLeft + 20;
      $("body").append("<p id='addOne'>您已经收藏过了哦</p>");
      $("#addOne").css({"position":"absolute", "left":numLeft+"px", "top": OffsetTop+"px", "color":"#3AA631", "font-size": "22px" })
      .animate({
        top: "-=30px",
        opacity:0.5
      }, 800 ,function(){
       $("#addOne").hide();
       $('#addOne').remove();
     });
    }
  });
});


  // 浏览页底部友情连接
  $('.innerlinks_title span').mouseover(function(){
    var states = $(this).attr("class");
    if(states == 'off') return false;
    var liindex = $('.innerlinks_title span').index(this);
    $(this).addClass('on').siblings().removeClass('on');
    $('#innerlinks ul').eq(liindex).show().siblings('#innerlinks ul').hide();
  });


  $.fn.extend({
    showTip : function(d, setH, setW, f){
      var html;
      if( !$("#tipBox").length ){
        $("body").append('<div id="tipBox"><div class="tipBox_relate"><div class="tipBox_html"></div><span id="tipBox_sj" class="tipBox_sj png"></span></div></div>');
      }
      if( isNaN(f) ){
        html = f;
      }else{
        html= "<p>"+d+"</p>";
      }
      $("#tipBox .tipBox_html").html(html);
      var OffsetTop = $(this).offset().top;
      var OffsetLeft = $(this).offset().left;
      var tipHeight = $("#tipBox").height();
      var tTop = OffsetTop-tipHeight-10 + parseInt(setH);
      var tLeft = OffsetLeft-160 +  parseInt(setW);
      $("#tipBox").css({"top": tTop+"px", "left": tLeft+"px" }).show();
      if ( $.browser.msie && $.browser.version == '6.0' ){
        var tH = $("#tipBox").height();
        $("#tipBox_sj").css({ top: tH-2+"px" });
      }
    }
  });
});


/*举报弹窗*/
$(function(){
    
    var doch = $(window).height();
    $("#report-win").height(doch);
    $(window).resize(function() {
      var doch = $(window).height();
      $("#report-win").height(doch);
    });
    $("body").on("click",".report-but",function(){
      $("#report-win").show();
    });
    $("#report-win").on("click",".report-bg,.close,.head .fr",function(){
      $("#report-win").hide();
    });
    $("#report-win").on("click",".main ul li",function(){
      $(this).addClass("on").siblings("li").removeClass("on");
      var datanum = $(this).data("num");
      var text = $(".report-m textarea").val();
      if (text == "请提供原作品链接" || text == "请输入举报内容") {
        if (datanum == "1") {
          $(".report-m textarea").val("请提供原作品链接").css("color","#3ca833");
        }else{
          $(".report-m textarea").val("请输入举报内容").css("color","#b7b7b7");
        }
      }
    });
    $(".report-m").on("focus","textarea",function(){
      var textcon = $(".report-m textarea").val();
      if (textcon == "请提供原作品链接" || textcon == "请输入举报内容") {
        $(this).val("").css("color","#333");
      }
    });
    $(".report-m").on("blur","textarea",function(){
      var textc = $(".report-m textarea").val();
      var datanum = $("#report-win .main ul li.on").data("num");
      if (textc == "") {
        if (datanum == "1") {
          $(this).val("请提供原作品链接").css("color","#3ca833");
        }else{
          $(this).val("请输入举报内容").css("color","#b7b7b7");
        }
      }
    });

    /*限制用户输入的字数*/
    $('.report-m').on("keydown","textarea",function(){
      var count = $(this).val().length;   
      if (count > 70) {
        alert('您输入的字数已超过限制字数');
        return false;
      }
    })

    /*正则匹配是否是链接*/   
    function checkURL(URL){
      var str=URL;    
      var Expression=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
      var objExp=new RegExp(Expression);

      if(objExp.test(str)==true){
        return true;
      }else{
        return false;
      }
    } 


    /*提交举报信息*/
    $(".report-m").on("click",".ok",function(){

      var content = $(".report-m textarea").val(); //举报内容
      var reason = $('.on').data('number');  //举报选项

      //选项1和2，判断链接是否正确
      if (reason == 1 || reason == 2) {
        if (!checkURL(content)) {
          alert('请输入正确的链接地址');
          return;
        }
      }    

      //选项3，如果用户没输入内容，则去除获取到的值
      if (reason == 3 && content == "请输入举报内容") {
        content = "";
      } 

      //选项4，内容不为空
      if (reason == 4 && (content == "" || content == "请输入举报内容")) {
        alert('请输入举报内容');
        return;
      }
    
             
      var picid = $('.picid').val();
      var link = window.location.href;
      
      $.ajax({
        type: "get",  
        url: "http://weili.ooopic.com/server.php?d=weili&p=jubao", 
        dataType : "jsonp",
        jsonp: "callback",
        data:{"content":content, "reason":reason, "picid":picid, "link":link },        
        success: function(data){
          
          $("#report-win").hide();
          if (data == 1) {
            alert('举报成功');
          } else if(data == 3) {
            alert('您已经举报过了哦');
          } else if(data == 4){
            alert('字数超过限制了');
          } else if(data == 5){
            alert('请登录');
          } else {
            alert('举报失败')
          }
        },
        error: function(msg){
          //console.log('失败')
        }
      }) 
     
    })
})

$(function(){
  //换一批功能
 $('.changesame').on('click',function(){
            var current=$(this).attr('current');
            var next=$(this).attr('next');

            if($('.'+next).html()=='') return false;

            $(this).attr('current',next);
            if(next=='thistwo'){
                 var xiayige='thisthree';
            } 
            if(next=='thisthree'){
                 var xiayige='thisfour';
            } 
            if(next=='thisfour'){
                 var xiayige='thisone';
            } 
            if(next=='thisone'){
                 var xiayige='thistwo';
            } 

            $(this).attr('next',xiayige);
            $('.'+current).hide();
            $('.'+next).show();

           $(".ranking-m").masonry({
               itemSelector : ".list",
               singleMode: true
            }); 
            $(".ranking-m img.lazy").lazyload({
                effect: "show",
                threshold : 300, 
                placeholder : "http://js.ooopic.com/2015/image/lz.gif"
            });

          }); 
});



window.onload=function(){
  $.getJSON("http://ajax.ooopic.com/redis/ajax_shownum.php?picid="+obj.picid, function (d){})
  getDownShare();
  window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
  PVTJ(); 
}
