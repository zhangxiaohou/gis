/*���������ղ���*/
  function getDownShare() { 
    $.getJSON("http://ajax.ooopic.com/ajax.api.php?id="+obj.picid+"&k="+obj.kid+"&action=showdata&callback=?&t="+(new Date()).getTime(), function (d)
    {
      if($('#dynamicInfo')!=undefined){
        var shoucang = '<span scid="'+obj.picid+'" title="�ղ�" id="pic_fav">�ղأ�<span id="currFav">'+d.scnum+'</span></span>';
            // www��VIP���ҳ�Ѳ�
            if(obj.pageType != undefined && obj.pageType == "www_show"){
              shoucang = '<span scid="'+obj.picid+'" title="�ղ�">�ղأ�<span id="currFav">'+d.scnum+'</span></span>';
            }
            var info = '���أ�'+d.dnum+'&nbsp;&nbsp;&nbsp;'+shoucang;
            $("#read_down_info").html(info);
            $("#loading").hide();
            $("#dynamicInfo").show();
        }
      })
   }
$(function(){
  $('.ico_dujia').html('����');
  $("#pic_play").attr("src",$("#pic_play").attr("src1"));
  //��һҳ����һҳ
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

    

 //���빺�ﳵ
 var stat =false;
 $("#bt_shopcar").live("click", function(){
  var that = $(this);
  var innerHTml = that.html();
  var id= that.attr('pid');
  if( innerHTml == '�鿴���ﳵ' ){ window.open("http://www.ooopic.com/shopcar/"); return false;}
  if( stat ) return false;
  that.html("���ڼ���...");
    var banquan=0;  //ʹ��Ȩ

    $(".radiotype").each(function(){
      var obj=$(this)[0];
      if(obj.checked==true){
        switch(parseInt($(obj).attr("value2"))){
          case 0: banquan=1;break;//��Ȩ
          case 2: banquan=1;break;//��Ȩ
        }
      }
    });

    $.getJSON('http://ajax.ooopic.com/shopcar.api.php?action=droporder&b='+banquan+'&pid='+id+'&callback=?&sf='+Math.random(),function(d){
      stat=false;

      if(parseInt(d.datas)==1||parseInt(d.datas)==3||parseInt(d.datas)==6){
        var nowNum = parseInt($("#shopCartNum").html())+1;
        $("#shopCartNum").html(nowNum);
        var tipInnerHtml = '<ul class="ok"><li class="ok_1">��ӳɹ�</li><li class="ok_2">���ﳵ�ܹ�'+nowNum+'����Ƹ�</li></ul>';
        that.showTip(1, 0 , 65, tipInnerHtml);
        that.html("�鿴���ﳵ").attr("href", "http://www.ooopic.com/shopcar/").showTip(1, 0 , 65, tipInnerHtml );
        setTimeout("$('#tipBox').hide();", 1500);
      }else{
       that.html("�鿴���ﳵ").attr("href", "http://www.ooopic.com/shopcar/");
       setTimeout("$('#tipBox').hide();", 1500);
     }

   });

  });


  //���ղ��¼�
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
    if( data == '�ղسɹ�'){
      var OffsetTop = that.offset().top;
      var OffsetLeft = that.offset().left;
      var numLeft = OffsetLeft + 20;
      $("body").append("<p id='addOne'>�ղسɹ�</p>");
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
      $("body").append("<p id='addOne'>���Ѿ��ղع���Ŷ</p>");
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


  // ���ҳ�ײ���������
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


/*�ٱ�����*/
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
      if (text == "���ṩԭ��Ʒ����" || text == "������ٱ�����") {
        if (datanum == "1") {
          $(".report-m textarea").val("���ṩԭ��Ʒ����").css("color","#3ca833");
        }else{
          $(".report-m textarea").val("������ٱ�����").css("color","#b7b7b7");
        }
      }
    });
    $(".report-m").on("focus","textarea",function(){
      var textcon = $(".report-m textarea").val();
      if (textcon == "���ṩԭ��Ʒ����" || textcon == "������ٱ�����") {
        $(this).val("").css("color","#333");
      }
    });
    $(".report-m").on("blur","textarea",function(){
      var textc = $(".report-m textarea").val();
      var datanum = $("#report-win .main ul li.on").data("num");
      if (textc == "") {
        if (datanum == "1") {
          $(this).val("���ṩԭ��Ʒ����").css("color","#3ca833");
        }else{
          $(this).val("������ٱ�����").css("color","#b7b7b7");
        }
      }
    });

    /*�����û����������*/
    $('.report-m').on("keydown","textarea",function(){
      var count = $(this).val().length;   
      if (count > 70) {
        alert('������������ѳ�����������');
        return false;
      }
    })

    /*����ƥ���Ƿ�������*/   
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


    /*�ύ�ٱ���Ϣ*/
    $(".report-m").on("click",".ok",function(){

      var content = $(".report-m textarea").val(); //�ٱ�����
      var reason = $('.on').data('number');  //�ٱ�ѡ��

      //ѡ��1��2���ж������Ƿ���ȷ
      if (reason == 1 || reason == 2) {
        if (!checkURL(content)) {
          alert('��������ȷ�����ӵ�ַ');
          return;
        }
      }    

      //ѡ��3������û�û�������ݣ���ȥ����ȡ����ֵ
      if (reason == 3 && content == "������ٱ�����") {
        content = "";
      } 

      //ѡ��4�����ݲ�Ϊ��
      if (reason == 4 && (content == "" || content == "������ٱ�����")) {
        alert('������ٱ�����');
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
            alert('�ٱ��ɹ�');
          } else if(data == 3) {
            alert('���Ѿ��ٱ�����Ŷ');
          } else if(data == 4){
            alert('��������������');
          } else if(data == 5){
            alert('���¼');
          } else {
            alert('�ٱ�ʧ��')
          }
        },
        error: function(msg){
          //console.log('ʧ��')
        }
      }) 
     
    })
})

$(function(){
  //��һ������
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
