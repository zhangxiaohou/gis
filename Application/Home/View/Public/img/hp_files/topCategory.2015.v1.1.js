//搜索框样式调整	
	$('#soall').hover(function(){
	    $(this).css('background','#3AA631');
	    $(this).css('cursor','pointer');
	},function(){
	    $(this).css('background','#009900');
	});

	$('#searchbutton').hover(function(){
	    $(this).css('background','#3AA631');
	    $(this).css('cursor','pointer');
	},function(){
	    $(this).css('background','#009900');
	});


	//搜索框下拉
    $(".btn-select-search").hover(function(){
        $('.select-list').show(); 	
    },function(){
	      $('.select-list').hide(); 
    });

         var background=$('.logo').attr('name');

	  	 $("body").on("click", function(e){ if(!$(e.target).hasClass('select-list')&&!$(e.target).hasClass('current-select')&&!$(e.target).hasClass('btn-select-search')) { $('.select-list').hide(); } }); $(".select-list a").on('click', function(){ var title = $(this).attr('data-title'); $('.current-select').html(title+'<i '+background+'></i>'); $(".select-list a.active").removeClass('active'); $(this).addClass('active'); });

	  	  $("#topkeyword").css({ color: "#bbbbbb" });
	  	  var kw;
	  	     kw='请输入标题、关键词、编号搜索';	

	  	  $("#topkeyword").focus(function(G) {
	  	     $("#topkeyword").css({ color: "#000000" });
	  	     if( $('#topkeyword').val() == kw ){
		  	     $('#topkeyword').val('');
	  	     }
	  	  }); 

	  	  $("#topkeyword").blur(function() {
	  	    $("#topkeyword").css({ color: "#bbbbbb" }); 
	  	    var kw1=$('#topkeyword').val();
	  	    if(kw1==''){
	  	       $('#topkeyword').val(kw);	
	  	    }
	  	   });


       /*搜索全站*/
			 $('#soall').click(function(){
		     var kw = $('#topkeyword').val();
		     kw = encodeURI(kw);
		     if(kw==""){
		         alert('请输入您要查找的关键词'); 
		     }else{
		             var r = new Date();
		             r = r.getTime();
		             var url ="http://so.ooopic.com/dealtest.php?kw="+kw+"&r="+r+"&lx=keywordid&callback=?";
		            $.getJSON(url,function(date){
		            	document.title=date;
		                if(date>0){
		                    location.href = "http://so.ooopic.com/sousuo/"+date+"/";
		                }else{
		                    location.href = "http://so.ooopic.com/search-"+kw+"--______oo__.html";
		                }
		          });
		        }
		    });