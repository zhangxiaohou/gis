/***********jquery.lazyload.min.js begin************/
(function($,window,document,undefined){var $window=$(window);$.fn.lazyload=function(options){var elements=this;var $container;var settings={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,data_attribute:"original",skip_invisible:true,appear:null,load:null,placeholder:"http://icon.90sheji.com/images/lz.gif"};function update(){var counter=0;elements.each(function(){var $this=$(this);if(settings.skip_invisible&&!$this.is(":visible")){return}if($.abovethetop(this,settings)||$.leftofbegin(this,settings)){}else{if(!$.belowthefold(this,settings)&&!$.rightoffold(this,settings)){$this.trigger("appear");counter=0}else{if(++counter>settings.failure_limit){return false}}}})}if(options){if(undefined!==options.failurelimit){options.failure_limit=options.failurelimit;delete options.failurelimit}if(undefined!==options.effectspeed){options.effect_speed=options.effectspeed;delete options.effectspeed}$.extend(settings,options)}$container=(settings.container===undefined||settings.container===window)?$window:$(settings.container);if(0===settings.event.indexOf("scroll")){$container.bind(settings.event,function(){return update()})}this.each(function(){var self=this;var $self=$(self);self.loaded=false;if($self.attr("src")===undefined||$self.attr("src")===false){if($self.is("img")){$self.attr("src",settings.placeholder)}}$self.one("appear",function(){if(!this.loaded){if(settings.appear){var elements_left=elements.length;settings.appear.call(self,elements_left,settings)}$("<img />").bind("load",function(){var original=$self.attr("data-"+settings.data_attribute);$self.hide();if($self.is("img")){$self.attr("src",original)}else{$self.css("background-image","url('"+original+"')")}$self[settings.effect](settings.effect_speed);self.loaded=true;var temp=$.grep(elements,function(element){return !element.loaded});elements=$(temp);if(settings.load){var elements_left=elements.length;settings.load.call(self,elements_left,settings)}}).attr("src",$self.attr("data-"+settings.data_attribute))}});if(0!==settings.event.indexOf("scroll")){$self.bind(settings.event,function(){if(!self.loaded){$self.trigger("appear")}})}});$window.bind("resize",function(){update()});if((/(?:iphone|ipod|ipad).*os 5/gi).test(navigator.appVersion)){$window.bind("pageshow",function(event){if(event.originalEvent&&event.originalEvent.persisted){elements.each(function(){$(this).trigger("appear")})}})}$(document).ready(function(){update()});return this};$.belowthefold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=(window.innerHeight?window.innerHeight:$window.height())+$window.scrollTop()}else{fold=$(settings.container).offset().top+$(settings.container).height()}return fold<=$(element).offset().top-settings.threshold};$.rightoffold=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.width()+$window.scrollLeft()}else{fold=$(settings.container).offset().left+$(settings.container).width()}return fold<=$(element).offset().left-settings.threshold};$.abovethetop=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.scrollTop()}else{fold=$(settings.container).offset().top}return fold>=$(element).offset().top+settings.threshold+$(element).height()};$.leftofbegin=function(element,settings){var fold;if(settings.container===undefined||settings.container===window){fold=$window.scrollLeft()}else{fold=$(settings.container).offset().left}return fold>=$(element).offset().left+settings.threshold+$(element).width()};$.inviewport=function(element,settings){return !$.rightoffold(element,settings)&&!$.leftofbegin(element,settings)&&!$.belowthefold(element,settings)&&!$.abovethetop(element,settings)};$.extend($.expr[":"],{"below-the-fold":function(a){return $.belowthefold(a,{threshold:0})},"above-the-top":function(a){return !$.belowthefold(a,{threshold:0})},"right-of-screen":function(a){return $.rightoffold(a,{threshold:0})},"left-of-screen":function(a){return !$.rightoffold(a,{threshold:0})},"in-viewport":function(a){return $.inviewport(a,{threshold:0})},"above-the-fold":function(a){return !$.belowthefold(a,{threshold:0})},"right-of-fold":function(a){return $.rightoffold(a,{threshold:0})},"left-of-fold":function(a){return !$.rightoffold(a,{threshold:0})}})})(jQuery,window,document);
/***********jquery.lazyload.min.js end************/

/**********jquery.masonry.min.js begin*************/
/**
 * jQuery Masonry v2.1.08
 * Copyright 2011 David DeSandro
 */

 (function(e,t,n){"use strict";var r=t.event,i;r.special.smartresize={setup:function(){t(this).bind("resize",r.special.smartresize.handler)},teardown:function(){t(this).unbind("resize",r.special.smartresize.handler)},handler:function(e,t){var n=this,s=arguments;e.type="smartresize",i&&clearTimeout(i),i=setTimeout(function(){r.dispatch.apply(n,s)},t==="execAsap"?0:100)}},t.fn.smartresize=function(e){return e?this.bind("smartresize",e):this.trigger("smartresize",["execAsap"])},t.Mason=function(e,n){this.element=t(n),this._create(e),this._init()},t.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},t.Mason.prototype={_filterFindBricks:function(e){var t=this.options.itemSelector;return t?e.filter(t).add(e.find(t)):e},_getBricks:function(e){var t=this._filterFindBricks(e).css({position:"absolute"}).addClass("masonry-brick");return t},_create:function(n){this.options=t.extend(!0,{},t.Mason.settings,n),this.styleQueue=[];var r=this.element[0].style;this.originalStyle={height:r.height||""};var i=this.options.containerStyle;for(var s in i)this.originalStyle[s]=r[s]||"";this.element.css(i),this.horizontalDirection=this.options.isRTL?"right":"left";var o=this.element.css("padding-"+this.horizontalDirection),u=this.element.css("padding-top");this.offset={x:o?parseInt(o,10):0,y:u?parseInt(u,10):0},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var a=this;setTimeout(function(){a.element.addClass("masonry")},0),this.options.isResizable&&t(e).bind("smartresize.masonry",function(){a.resize()}),this.reloadItems()},_init:function(e){this._getColumns(),this._reLayout(e)},option:function(e,n){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))},layout:function(e,t){for(var n=0,r=e.length;n<r;n++)this._placeBrick(e[n]);var i={};i.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var s=0;n=this.cols;while(--n){if(this.colYs[n]!==0)break;s++}i.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:i});var o=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",u=this.options.animationOptions,a;for(n=0,r=this.styleQueue.length;n<r;n++)a=this.styleQueue[n],a.$el[o](a.style,u);this.styleQueue=[],t&&t.call(e),this.isLaidOut=!0},_getColumns:function(){var e=this.options.isFitWidth?this.element.parent():this.element,t=e.width();this.columnWidth=this.isFluid?this.options.columnWidth(t):this.options.columnWidth||this.$bricks.outerWidth(!0)||t,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((t+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(e){var n=t(e),r,i,s,o,u;r=Math.ceil(n.outerWidth(!0)/this.columnWidth),r=Math.min(r,this.cols);if(r===1)s=this.colYs;else{i=this.cols+1-r,s=[];for(u=0;u<i;u++)o=this.colYs.slice(u,u+r),s[u]=Math.max.apply(Math,o)}var a=Math.min.apply(Math,s),f=0;for(var l=0,c=s.length;l<c;l++)if(s[l]===a){f=l;break}var h={top:a+this.offset.y};h[this.horizontalDirection]=this.columnWidth*f+this.offset.x,this.styleQueue.push({$el:n,style:h});var p=a+n.outerHeight(!0),d=this.cols+1-c;for(l=0;l<d;l++)this.colYs[f+l]=p},resize:function(){var e=this.cols;this._getColumns(),(this.isFluid||this.cols!==e)&&this._reLayout()},_reLayout:function(e){var t=this.cols;this.colYs=[];while(t--)this.colYs.push(0);this.layout(this.$bricks,e)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(e){this.reloadItems(),this._init(e)},appended:function(e,t,n){if(t){this._filterFindBricks(e).css({top:this.element.height()});var r=this;setTimeout(function(){r._appended(e,n)},1)}else this._appended(e,n)},_appended:function(e,t){var n=this._getBricks(e);this.$bricks=this.$bricks.add(n),this.layout(n,t)},remove:function(e){this.$bricks=this.$bricks.not(e),e.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var n=this.element[0].style;for(var r in this.originalStyle)n[r]=this.originalStyle[r];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),t(e).unbind(".masonry")}},t.fn.imagesLoaded=function(e){function u(){e.call(n,r)}function a(e){var n=e.target;n.src!==s&&t.inArray(n,o)===-1&&(o.push(n),--i<=0&&(setTimeout(u),r.unbind(".imagesLoaded",a)))}var n=this,r=n.find("img").add(n.filter("img")),i=r.length,s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",o=[];return i||u(),r.bind("load.imagesLoaded error.imagesLoaded",a).each(function(){var e=this.src;this.src=s,this.src=e}),n};var s=function(t){e.console&&e.console.error(t)};t.fn.masonry=function(e){if(typeof e=="string"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=t.data(this,"masonry");if(!r){s("cannot call methods on masonry prior to initialization; attempted to call method '"+e+"'");return}if(!t.isFunction(r[e])||e.charAt(0)==="_"){s("no such method '"+e+"' for masonry instance");return}r[e].apply(r,n)})}else this.each(function(){var n=t.data(this,"masonry");n?(n.option(e||{}),n._init()):t.data(this,"masonry",new t.Mason(e,this))});return this}})(window,jQuery);/**********jquery.masonry.min.js end*************/

 $(window).load(function(){
 	/*瀑布流*/
 	$(".ranking-m").masonry({
 		itemSelector : ".list",
 		singleMode: true
 	});  	
 	$("img.lazy").lazyload({
 		effect: "show",
 		threshold : 300, 
 		placeholder : "http://js.ooopic.com/2015/image/lz.gif"
 	});    
 });

 /*公共方法*/
 function pageLoad()
 {
 	var endT=new Date();
 	var endTime=endT.getTime();
 	obj.loadTime=(endTime-beginTime)/1000;
 	$("#opentime").html(" " + obj.loadTime + "");
 }

 function PVTJ()
 {
 	$.getJSON("http://tj.ooopic.com/index.php?m=pagePVTJ&picid="+obj.picid+"&exeCode="+obj.exeCode+"&exeTime="+obj.exeTime+"&loadCode="+obj.loadCode+"&loadTime="+obj.loadTime+"&kid="+obj.kid+"&bigclassid="+obj.bigclassid+"&smallclassid="+obj.smallclassid+"&page="+obj.page+"&callback=?&time="+(new Date()).getTime());
		// 百度统计
		var hm = document.createElement("script");
		hm.src = "//hm.baidu.com/hm.js?6260fe7b21d72d3521d999c79fe01fc7";
		var s = document.getElementsByTagName("script")[0];
		s.parentNode.insertBefore(hm, s);
		$("img[src='http://eiv.baidu.com/hmt/icon/21.gif']").hide();
		var _hmt = _hmt || [];
		(function() {
			var hm = document.createElement("script");
			hm.src = "//hm.baidu.com/hm.js?5b1cb8ea5bd686369a321f1c5e6408b6";
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(hm, s);
		})();
		(function(){
			var bp = document.createElement('script');
			bp.src = '//push.zhanzhang.baidu.com/push.js';
			var s = document.getElementsByTagName("script")[0];
			s.parentNode.insertBefore(bp, s);
		})();
	}

	function showInfo()
	{
		$.getJSON("http://ajax.ooopic.com/index.php?m=getInfo.v1&callback=?&time="+(new Date()).getTime(),function(data){
			$("#shopCartNum").text(data.shopCartNum);
			$("#num_sjg,#num_sjg1").text(data.sjg);
			$("#uc,#uc1").text(data.uc);
		});
	}


	
	$(window).load(function(){
		showInfo();
	});

	$(function(){
		pageLoad();
		$(".t-recharge").mouseenter(function() {
			$(this).addClass('hover').find('.show-more').show();
		});
		$(".t-recharge").mouseleave(function() {
			$(this).removeClass('hover').find('.show-more').hide();
		});

	   $('.collectkefu').live('click',function(){
	      var kefuTop=$('.sidebar').offset().top;
	      var kefuLeft=$('.sidebar').offset().left;

	      $('.sidebar').animate({
	           left:'130px'
	      },500,function(){
	          $('.sidebar').remove();          
	          $('.newsidebar').show();
	          $('.newsidebar').animate({
	            left:'0px'	
	          },500,function(){
	             
	          });
	      });
	   });

       var settime;
	   $('.top1,.qqhover').hover(function(){
	   	  clearTimeout(settime);
	      $('.qqhover').css('left','-1px');
	   	  $('.qqhover').css('display','block');
	      $('.qqhover').show();	
	      $('.qqhover').animate({
	      	  left:'-140px'
	      },500,function(){
	      });
	   },function(){
	   	    settime=setTimeout(function(){
	         $('.qqhover').hide();	
	   	  },100);
	   });



	    $('.top2').hover(function(){
	      $('.tel1hover').css('left','-1px');
	      $('.tel1hover').show();
	       $('.tel1hover').animate({
	      	  left:'-140px'
	      },500,function(){
	      });

		   },function(){
		      $('.tel1hover').hide();	
		   });
	    
/*客服*/
  	if($(window).width()<=1465){
      $('.sidebar').show();
  		$('.collectkefu').show();
  	}else{
      $('.sidebar').show();
    }

      $(".welcome_ul .more").mouseenter(function() {
            $(this).addClass('hover').find('.moudle_more').show();
        });
        $(".welcome_ul .more").mouseleave(function() {
            $(this).removeClass('hover').find('.moudle_more').hide();
        });
    	$("#nav .position").hover(function(){
    		$(this).find(".moudle").show();
    	},function(){
    		$(this).find(".moudle").hide();
    	});


	});

	$(window).load(function(){	
		// 收藏下载
		$(".list-img").mouseenter(function(){

			if($(this).find('.list-down').eq(0).html()==null){

				$(this).append('<div class="list-down"><span style="cursor:pointer;" picid="'+$(this).attr('picid')+'" class="collect fl a-fav">收藏</span><a href="http://downloads.ooopic.com/download.php?id='+$(this).attr('picid')+'&banquan=0" class="download fr" target="_blank"><i></i>下载</a></div>');

			}

			$(this).find('.list-down').eq(0).stop().animate({'top': 0}, 200);

		});

		$(".list-img").mouseleave(function(){

			$(this).find('.list-down').eq(0).stop().animate({'top': '-40px'}, 200);

		});

		
		
	



		var c = $("<div></div>").attr("id", "confirm").css({
			margin: "0",
			padding: "0",
			position: "relative",
			"z-index": "99",
			display: "none",
			color: "#5f5f5f",
			"font-size": "12px"
		});

		$(

			"<div style='margin:0;padding:0;background-color:#DDDDDD; width:150px; height:70px; position:absolute; top:0; left:0;'></div><div style='margin:0;padding:0;background-color:#FFFFFF;  width:133px; height:60px; position:absolute; top:5px; left:5px; padding-left:7px;'><p style='margin:0;padding:0; height:30px; line-height:30px; padding-left:5px;'>确定要取消收藏吗?</p><ul style='margin:0;padding:0;list-style-type:none;zoom:1' class='confirm_ul'><li style='margin:0;padding:0;list-style:none;width:49px; height:20px; line-height:20px; float:left; text-align:center; margin-left:10px; cursor:pointer; color:#FFFFFF; background:#2fad1c;' class='confirm_li1'>确认</li><li style='margin:0;padding:0;list-style:none;width:49px; height:20px; line-height:20px; float:left; text-align:center; margin-left:10px; cursor:pointer;color:#5f5f5f; background:#ebebeb;' class='confirm_li2'>取消</li></ul></div>")

		.appendTo($("<div style='margin:0;padding:0;' class='clearfix relative'></div>").appendTo(c));

		c.appendTo("body");

		var b = $("<div></div>").attr("id", "confirm2").css({
			margin: "0",
			padding: "0",
			"background-color": "#DDDDDD",
			display: "none",
			width: "117px",
			height: "50px",
			position: "absolute",
			top: "0",
			left: "0",
			"font-size": "12px",
			"z-index":"10"
		});

		$(
			"<div style='margin:0;padding:0;background-color:#DDDDDD; width:117px; height:50px; position:absolute; top:0; left:0;' class='confirm_wrap2'></div><div style='margin:0;padding:0;background-color:#FFFFFF;  width:100px; height:40px; position:absolute; top:5px; left:5px; padding-left:7px;' class='confirm_box2'><span style='height:40px; line-height:40px; padding-left:23px; position:absolute;'></span><p style='margin:0;padding:0; height:40px; line-height:40px; padding-left:23px;' class='confirm_p2'></p></div>")
		.appendTo($("<div style='margin:0;padding:0;' class='clearfix relative'></div>").appendTo(b));
		b.appendTo("body");
		var a = new Date();

		$(".a-fav[picid], .a-cancelfav[picid]").live("click", function () {
			var h = $(this);
			var f = h.offset().left;
			var d = h.offset().top;
			var e = h.attr("picid");
			if (h.hasClass("a-fav")) {
				var g = "http://tj.ooopic.com/api/api.2013.php?action=sc&picid=" + e + "&callback=?&r=" + a;
				$.getJSON(g, function (i) {
					if (i.data == 1) {
						$(".confirm_p2").html("收藏成功！");
						$(".a-fav[picid=" + e + "]").removeClass("a-fav").addClass("a-cancelfav").text("取消收藏");
					} else {
						if (i.data == -1) {
							$(".confirm_p2").html("请先登录！")
						}
					}

					$("#confirm2").css({
						top: d + "px",
						left: f - 15 + "px",
						position: "absolute"
					}).show().animate({
						top: "-=53px"
					}, 200);
					setTimeout(function () {
						$("#confirm2").hide()
					}, 1000)
				})
			} else {
				$("#confirm").attr({
					picid: e
				});

				$("#confirm").css({
					top: d + "px",
					left: f - 30 + "px",
					position: "absolute"
				}).show().animate({
					top: "-=73px"
				}, 200);

				$("#confirm2").css({
					top: d + "px",
					left: f - 15 + "px",
					position: "absolute"
				})
			}
		});

$(".confirm_li1").live("click", function () {
	var d = $("#confirm").attr("picid");
	var e = "http://tj.ooopic.com/api/api.2013.php?action=canclesc&picid=" + d + "&callback=?&r=" + a;
	$.getJSON(e, function (f) {

		if (f.data == 1) {
			$("#confirm").hide();
			$(".a-cancelfav[picid=" + d + "]").removeClass("a-cancelfav").addClass("a-fav").text("收藏");;
			$(".confirm_p2").html("取消成功");
			$("#confirm2").show().animate({
				top: "-=53px"
			}, 200);
			setTimeout("$('#confirm2').hide();", 1000)
		} else {
			$("#confirm").hide();
			$(".confirm_p2").html("取消失败!");
			$("#confirm2").show().animate({
				top: "-=53px"
			}, 200);
			setTimeout("$('#confirm2').hide();", 1000)
		}
	})
});



$(".confirm_li2").live("click", function () {
	$("#confirm").hide()
})


/***********jquery.fav.min.js end************/
$(window).scroll(function(){		
			//显示或隐藏返回顶部按钮
			var htmlTop = $(document).scrollTop();
			if( htmlTop > 20){
				$("#backToTop").show(); 
			}else{
				$("#backToTop").hide();
			}
		});	



/***********返回顶部************/
$("#backToTop").live("click", function(){
	var _this = $(this);
	$('html,body').animate({ scrollTop: 0 }, 500 ,function(){
		_this.hide();
	});
	return false;
});

$("#topkeyword").on('focus',function(e) {
	e.stopPropagation();
	var timeout;
	var flag = $('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist').eq(0).html();
	if(flag){
		$('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist').eq(0).css('display','block');
	}
	var nowplace=-1;

	$("#topkeyword").on('keyup',function(e){
		e.stopPropagation();
		clearTimeout(timeout);
		if(e.keyCode=="38" || e.keyCode=="40"){
			if(e.keyCode=="38"){
				if(nowplace=="-1" || nowplace=="0"){
					nowplace=9;
				}else{
					nowplace=nowplace-1;
				}
			}else{
				if(nowplace=="9"){
					nowplace=0;
				}else{
					nowplace=nowplace+1;
				}
			}
			$("#topkeyword").val($('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist .sokeyup_1').eq(nowplace).find('.sokeyup_2').eq(0).html());
			$('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist .sokeyup_1').eq(nowplace).css('background','rgb(235, 235, 235)').siblings().css('background','rgb(255, 255, 255)');
			return false;
		}else if(e.keyCode=="13"){
			var type = $(".select-list a.active").attr('data-index');
			var isyueka =$(".select-list a.active").attr('yueka');
			var isjiayueka =$(".select-list a.active").attr('isjiayueka');
			if(isyueka == 1 && isjiayueka!=1){
				goToYueka(type,'topkeyword');
		    }else{
			   goSearch(type,'topkeyword');
		    }
		}

		$("#floattopkeyword").val($("#topkeyword").val());
		timeout = setTimeout(function(){
			var val = $("#topkeyword").val();
			$.ajax({
				url: 'http://so.ooopic.com/cueWord.php',
				type: 'GET',
				jsonp: 'callback',
				dataType: 'jsonp',
				data: {kw: val},

				success: function(data){
					if(data==""){
						$('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist').eq(0).css('display','none');
					}else{
						$('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist').eq(0).html('').css('display','block').append(data);
					}
				}
			});
		},500);

	})

	var val = $("#topkeyword").val();
	if (val != '') {
		timeout = setTimeout(function(){
			$.ajax({
				url: 'http://so.ooopic.com/cueWord.php',
				type: 'GET',
				jsonp: 'callback',
				dataType: 'jsonp',
				data: {kw: val},

				success: function(data){
					if(data==""){
						$('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist').eq(0).css('display','none');
					}else{
						$('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist').eq(0).html('').css('display','block').append(data);
					}
				}
			});
		},500);
	}
		

});

$("#topkeyword").on('blur',function(e) {
	e.stopPropagation();
	setTimeout(function(){
		$('#topkeyword').parents('.searchbar').eq(0).find('.topkeywordlist').eq(0).css('display','none');
	},500);
	$("#topkeyword").off('keyup');
});

$('.topkeywordlist').on('click', function(e){
	e.stopPropagation();
	$(this).css('display','block');
});

$("#searchbutton").on('click',function(e){
	e.stopPropagation();
	var type = $(".select-list a.active").attr('data-index');
	var isyueka =$(".select-list a.active").attr('yueka');
	if(isyueka == 1){
		goToYueka(type,'topkeyword');
    }else{
	   goSearch(type,'topkeyword');
    }
});
});

function goSearch(type,kwID) {
	var from = arguments[0];
	var kw;
	kw = $("#"+kwID).val();
	defaultkw = $("#"+kwID).attr('defaultv');

	if(kw=='' || kw=='240万设计作品搜索下载' || kw==defaultkw || kw=='请输入标题、关键词、编号搜索'){
		alert("请输入要查找的关键词");
		$("#"+kwID).focus();
		return false;
	}else{	
		kw = encodeURI(kw);
		if((type > 0 && type < 6) || type == 20 || type == 90 || type == 70 || type == 1006 || type == 1007){
			location.href = "http://so.ooopic.com/search-"+kw+"-"+type+"-______oo__.html";
			return false;
		}else if(type == 15){
			location.href = "http://so.ooopic.com/search-"+kw+"-15-______oo__.html";
		}else if(type == 105){
			location.href = "http://so.ooopic.com/search-"+kw+"-100-______oo__.html";
			return false;
		}else if(type == 95){
			location.href = "http://so.ooopic.com/search-"+kw+"-95-______oo__.html";
			return false;
		}else if(type == 6){
			location.href = "http://so.ooopic.com/search-"+kw+"-6-______oo__.html";
			return false;
		} else if(type == 7){
			location.href = "http://so.ooopic.com/search-"+kw+"-7-______oo__.html";
			return false;
		} else if(type==124){
			location.href = "http://so.ooopic.com/search-"+kw+"-124-______oo__.html";
			return false;
		} else if(type==127){
			location.href = "http://so.ooopic.com/search-"+kw+"-127-______oo__.html";
			return false;
		}else if(type==75){
			location.href = "http://so.ooopic.com/search-"+kw+"-75-______oo__.html";
			return false;
		}else if(type == 10){
			location.href = "http://so.ooopic.com/search-"+kw+"-10-10___0_0__oo__.html";
			return false;
		} else if (type == 37) {
			location.href = "http://so.ooopic.com/search-"+kw+"-0-_____37_oo__.html";
			return false;
		} else if (type == 38) {
			location.href = "http://so.ooopic.com/search-"+kw+"-0-___0_0_38_oo__.html";
			return false;
		}else if (type == 100) {
			location.href = "http://so.ooopic.com/search-"+kw+"-80-___0_0__oo__.html";
			return false; 
		}else if (type == 101) {
			location.href = "http://so.ooopic.com/search-"+kw+"-50-___0_0__oo__.html";
			return false; 
		}else if (type == 102) {
			location.href = "http://so.ooopic.com/search-"+kw+"-60-___0_0__oo__.html";
			return false; 			
		}else if (type == 106) {
			location.href = "http://so.ooopic.com/search-"+kw+"-106-___0_0__oo__.html";
            return false;
		}else if (type == 1055){
			location.href = "http://so.ooopic.com/search-"+kw+"-105-___0_0__oo__.html";
            return false;
		}else if (type==500){
            location.href="http://so.ooopic.com/search-"+kw+"-0-___0_0__oo___1.html";
            return false;
		}else{
			var r = new Date();
			r = r.getTime();
			var url ="http://so.ooopic.com/jumpkid.php?kw="+kw+"&r="+r+"&lx=keywordid&callback=?";
			$.getJSON(url,function(date){
				date = date.split('|');
				if(date[0]>0){
					if(date[1]==-15){
						location.href = "http://so.ooopic.com/sousuo/"+date[0]+"/";
					}else{
						location.href = "http://so.ooopic.com/search-"+date[2]+"-"+date[1]+"-0_0____0_ooo_0_1_0.html";
					}
				}else{
					location.href = "http://so.ooopic.com/search-"+kw+"-"+type+"-______oo__.html";
				}
			});  
		}
	}
}


function goToYueka(type,kwID) {
	var from = arguments[0];
	var kw;
	kw = $("#"+kwID).val();
	defaultkw = $("#"+kwID).attr('defaultv');
	var isjiayueka =$(".select-list a.active").attr('isjiayueka');

	if(kw=='' || kw=='240万设计作品搜索下载' || kw==defaultkw || kw=='请输入标题、关键词、编号搜索'){
		alert("请输入要查找的关键词");
		$("#"+kwID).focus();
		return false;
	}else{	
		kw = encodeURI(kw);
		
		if((type > 0 && type < 6) || type == 20 || type == 90 || type == 70 || type == 1006 || type == 1007){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-"+type+"-______oo__.html";
			return false;
		}else if(type == 15){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-15-______oo__.html";
		}else if(type == 105){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-100-______oo__.html";
			return false;
		}else if(type == 95){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-95-______oo__.html";
			return false;
		}else if(type == 6){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-6-______oo__.html";
			return false;
		} else if(type == 7){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-7-______oo__.html";
			return false;
		} else if(type==124){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-124-______oo__.html";
			return false;
		} else if(type==127){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-127-______oo__.html";
			return false;
		}else if(type==75){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-75-______oo__.html";
			return false;
		}else if(type == 10){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-10-10___0_0__oo__.html";
			return false;
		} else if (type == 37) {
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-0-_____37_oo__.html";
			return false;
		} else if (type == 38) {
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-0-___0_0_38_oo__.html";
			return false;
		}else if (type == 100) {
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-80-___0_0__oo__.html";
			return false; 
		}else if (type == 101) {
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-50-___0_0__oo__.html";
			return false; 
		}else if (type == 102) {
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-60-___0_0__oo__.html";
			return false; 			
		}else if (type == 106) {
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-106-___0_0__oo__.html";
            return false;
		}else if (type == 1055){
			location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-105-___0_0__oo__.html";
            return false;
		}else if (type==500){
            location.href="http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-0-___0_0__oo___1.html";
            return false;
		}else{
			var r = new Date();
			r = r.getTime();
			var url ="http://so.ooopic.com/jumpkid.php?kw="+kw+"&r="+r+"&lx=keywordid&callback=?";
			$.getJSON(url,function(date){
				date = date.split('|');
				if(date[0]>0){
					if(date[1]==-15){
						location.href = "http://www.ooopic.com/yuekazhuanqu/so-"+date[0]+".html";
					}else{
						location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+date[2]+"-"+date[1]+"-0_0____0_ooo_0_1_0.html";
					}
				}else{
					location.href = "http://www.ooopic.com/yuekazhuanqu/search-"+kw+"-"+type+"-______oo__.html";
				}
			});  
		}
	}
}







