/**
 * ע������л�����
 */
function regQiehuan()
{
    $("#user-reg-mainBox").css({"width":"860px"});
    $(".regBox").addClass("regBox-on");
    $(".login-box").show();
	$(".ooopic").hide();
}

/**
 * ��ȡ�û����
 */
function getQiyeUser()
{
    return $("input[name='qiyeUser']").val();
}

/**
 * ��ʾ������Ϣ
 */
function errorShowTips(str)
{
    if(str==""){
        $(".login-wrap.more3").show();
        $(".login-wrap.error").hide();
        return false;
    }
    $(".qiyeTitle").hide();
    $(".login-wrap.more3").hide();
    $(".login-wrap.error").show();
    $(".login-wrap.error i,.login-wrap.error span").removeClass('moretext');
    $(".login-wrap.error span").html(str);
}



$(function (){
	
	function init_regOrLogin()
	{
		
		$(".ooopicqy").css("display","inline-block");
		
        $(".login-label-userTitle").html('�ֻ���/����<span style="color:#bdbdbd;margin-left:75px;">�ֻ���ע�� </span><span style="color:red;">����5��ͼ��</span>');
		
		$(".mylogin-input").text("�û���");

        // ע��
        $(".qiyeTitle").html("<a href='javascript:;' class='f14 click-qiyeReg-btnid hoverunderline color_green fr'>�л�����ҵ�˺�ע�� >> </a>");
        $(".regtitle").html('ע���û���');

        // ��¼
        $(".qiyeLoginTitle").html("<a href='javascript:;' class='f14 click-qiyeReg-btnid hoverunderline color_green fr'>�л�����ҵ�˺ŵ�¼ >> </a>");
        $("input[name='qiyeUser']").val(0);
        $(".logintitle").html('��ͼ�˺ŵ�¼');		
	}
	
    // վ��ע��
    $(".click-reg-btnid").live("click",function (){
        
        $("input[name='username']").val("");   
        $("input[name='login_username']").val(""); 
        $("input[name='login_password']").val(""); 
        $("input[name='password']").val(""); 
        $("input[name='password_two']").val("");

        $("input[name='username']").prev().show();
        $("input[name='password']").prev().show();
        $("input[name='password_two']").prev().show();
        $("input[name='login_username']").prev().show(); 
        $("input[name='login_password']").prev().show();
        $(".login-wrap.more3").show();
        $(".login-wrap.error").hide();
		regQiehuan();
		
		init_regOrLogin();

    });
    $(".login-label").on('click',function(e){
        e.stopPropagation();
        $(this).next('input').focus();
    });

    // ��ҵע��
    $(".click-qiyeReg-btnid").live("click",function (){
        regQiehuan();
		
		$(".ooopicpre").css("display","inline-block");
		$("input[name='username']").val("");   
        $("input[name='login_username']").val(""); 
        $("input[name='login_password']").val(""); 
        $("input[name='password']").val(""); 
        $("input[name='password_two']").val("");

        $("input[name='username']").prev().show();
        $("input[name='password']").prev().show();
        $("input[name='password_two']").prev().show();
        $("input[name='login_username']").prev().show(); 
        $("input[name='login_password']").prev().show();
        $(".login-wrap.more3").show();
        $(".login-wrap.error").hide();
        $(".login-label-userTitle").text("��˾����");
		
		$(".mylogin-input").text("��˾����");

        // ע��
        $(".qiyeTitle").html("<a href='javascript:;' class='f14 click-reg-btnid hoverunderline color_green fr' >�л��ɸ����˺�ע�� >> </a>");
        $(".regtitle").html("��ҵע��");
        // ��¼
        $(".qiyeLoginTitle").html("<a href='javascript:;' class='f14 click-reg-btnid hoverunderline color_green fr' >�л��ɸ����˺ŵ�¼ >> </a>");
        $("input[name='qiyeUser']").val(1);
        $(".logintitle").html('��ҵ�˺ŵ�¼');
    });


    $(".login-btn").mouseover(function(){
        $(this).addClass("login-btn-hover");
    }).mouseout(function(){
        $(this).removeClass("login-btn-hover");
    });


    /****************** ע����� ***********************************/
    // ��ȡ����
    $("input[name='username'],input[name='password'],input[name='password_two'],input[name='qq']").focus(function (){
        $(this).prev().hide();
    });

    // ʧȥ����
    $("input[name='username'],input[name='password'],input[name='password_two'],input[name='qq']").blur(function (){
        if($(this).val() == ""){
            $(this).prev().show();
        }else{
            if(checkPassword() == false){
                return false;
            }
            if(checkPasswordTwo() == false){
                return false;
            }
        }
    });

    $("input[name='username']").blur(function (){
        var isQiye = getQiyeUser();     // �Ƿ���ҵ�û�

        if(isQiye == 1){
            if(checkQiyeUsername() == false){return false;}
        }else{
            if(checkUsername() == false){return false;}
        }
    });

    // �س�ע��
    $("input[name='username'],input[name='password'],input[name='password_two'],input[name='qq']").keydown(function (event){
        if(event.keyCode ==13){
            ooopic_registe();
        }
    });

    // ���ע��
    $("#reg-submit").click(function (){
        ooopic_registe();
    });


    /****************** ��¼���� ***********************************/

    // ��ȡ����
    $("input[name='login_username'],input[name='login_password']").focus(function (){
        $(this).prev().hide();
    });

    // ʧȥ����
    $("input[name='login_username'],input[name='login_password']").blur(function (){
        if($(this).val() == ""){
            $(this).prev().show();
        }
    });

    // �س���¼
    $("input[name='login_username'],input[name='login_password']").keydown(function (event){
        if(event.keyCode ==13){
            ooopic_login();
        }
    });

    // �����¼
    $("#login-submit").click(function (){
        ooopic_login();
    });

});


/**
 * �û�ע��
 */
function ooopic_registe()
{
    var isQiye = getQiyeUser();     // �Ƿ���ҵ�û�

    if(isQiye == 1){
        if(checkQiyeUsername() == false){return false;}
    }else{
        if(checkUsername() == false){return false;}
    }

    if(checkPassword() == false){
        return false;
    }

    if(checkPasswordTwo() == false){
        return false;
    }

    var username    = $("input[name='username']").val();
    var password    = $("input[name='password']").val();
    var qq          = $("input[name='qq']").val();

    $(".login-loading").show();

    var rand= new Date();
    $.ajax({   
        type: "Get",  
        url: "http://user.ooopic.com/user/check_reg.php", 
        data:{"action": "savereg",  "qq" : qq , "username" : username , "password": password, "qiyeUser":isQiye, "rand":rand },
        jsonp: "callback",   
        dataType: "jsonp",
        success: function(html){
            if (($.trim(html).slice(0,6)) == "regsuc") {
                var returnUrl = $.trim(html).slice(6);
                if( returnUrl== '' ) returnUrl= 'http://user.ooopic.com/u/index.php';
                location.href = returnUrl;
            } else {
                $(".login-loading").hide();
                return false;
            }
        }
    });
}


/**
 * ��֤�û���
 */
function checkUsername()
{
    var re          = /^[A-Za-z0-9_]+$/;
    var re_tuke     = /^tuke\S*$/;
    var username    = $("input[name='username']");
    var flag        = username.attr("flag");
    var remail = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var rePhone = /^1[3578][0-9]{9}$/;

    if(!remail.test(username.val()) && !rePhone.test(username.val())){
        errorShowTips("�û�������Ϊ�ֻ�������");
        return false;
    }else if(re_tuke.test(username.val())){
        errorShowTips("���û����ѱ�ע��");
        return false;
    }else if((username.val()).length > 40){
        errorShowTips("�û������ܶ���40���ַ�");
        return false;
    }else if((username.val()).length < 6){
        errorShowTips("�û�����������6���ַ�");
        return false;
    }else{
        if(flag == "true" && username.val() == username.attr("data")){
            return true;
        }

        var rand= new Date();
        $.ajax({   
            type: "Get",  
            url: "http://user.ooopic.com/user/check_reg.php?action=name&username="+username.val()+"&rand="+rand,  
            jsonp: "callback",   
            dataType: "jsonp",
            success: function(html){
                if ($.trim(html) == 'suc'){
                    errorShowTips("");
                    username.attr("flag", 'true');
                    username.attr("data", username.val());
                    return true;
                } else {
                    errorShowTips("���˺��ѱ�ע�ᣬ��ʹ�������˺�ע��");
                    return false;
                }
            }
        });
    }
}



/**
 * ��֤�û���
 */
function checkQiyeUsername()
{
    var re          = /[\u4e00-\u9fa5\W]+/;
    var re_tuke     = /^tuke\S*$/;
    var username    = $("input[name='username']");
    var flag        = username.attr("flag");

    if (!re.test(username.val())) {
        errorShowTips("�û��������ġ���ĸ�����ֺ͡�_�������!");
        return false;
    }else if(re_tuke.test(username.val())){
        errorShowTips("���û����ѱ�ע��!");
        return false;
    }else if((username.val()).length > 30){
        errorShowTips("�û������ܶ���30���ַ�!");
        return false;
    }else if((username.val()).length < 6){
        errorShowTips("�û�����������6���ַ�!");
        return false;
    }else{
        if(flag == "true" && username.val() == username.attr("data")){
            return true;
        }

        var rand= new Date();
        $.ajax({   
            type: "Get",  
            url: "http://user.ooopic.com/user/check_reg.php?action=qiyeName&username="+encodeURI(username.val())+"&rand="+rand,  
            jsonp: "callback",   
            dataType: "jsonp",
            success: function(html){
                if ($.trim(html) == 'suc'){
                    errorShowTips("");
                    username.attr("flag", 'true');
                    username.attr("data", username.val());
                    return true;
                } else {
                    errorShowTips("���˺��ѱ�ע�ᣬ��ʹ�������˺�ע��");
                    return false;
                }
            }
        });
    }
}



function checkPassword(){
    var password = $("input[name='password']");
    var re2 = /^[A-Za-z0-9_]+$/;

    if (password.val() == ""){
        errorShowTips("���벻��Ϊ��");
        password.focus();
        return false;
    }else{
        if((password.val()).length < 8){
            errorShowTips("�������������ֺ���ĸ������8λ");
            password.focus();
            return false;
        }else if((password.val()).length > 20)  {
            errorShowTips("�������������ֺ���ĸ�����20λ");
            password.focus();
            return false;
        }else if(!re2.test(password.val())) {
            errorShowTips("����ֻ������8-20λ���ڵ���ĸ�����ֺ͡�_��");
            password.focus();
            return false;
        }else if(!(/[A-Za-z]{1,}/.test(password.val())) || !(/[\d]{1,}/.test(password.val()))){
            errorShowTips("�������������ֺ���ĸ������8λ");
            password.focus();
            return false;
        }else{
            errorShowTips("")
            return true;
        }
    }
}

function checkPasswordTwo(){
    var password        = $("input[name='password']");
    var password_two    = $("input[name='password_two']");
    if( password_two.val() == ''){
        errorShowTips("Ϊȷ�����������ȷ������ж���ȷ��");
        password_two.focus();
        return false;
    }
    if(password_two.val() != password.val()) {
        errorShowTips("�������벻һ�£����ٴ�ȷ��");
        password_two.focus();
        return false;
    }

    return true;
}


/**
 * ��¼����
 */
function ooopic_login(){
    var isQiye = getQiyeUser();     // �Ƿ���ҵ�û�
    var username = $("input[name='login_username']");
    var password = $("input[name='login_password']");
    if(username.val() == ""){
        username.focus();
        $(".login-wrap.more3").hide();
        $(".login-wrap.error").show();
        $(".login-wrap.error span").html("�û�������Ϊ��");
        setTimeout(function(){
            $(".login-wrap.error").hide();
            $(".login-wrap.more3").show();
        },3000);
        return false;
    }

    if( password.val() == ""){
        password.focus();
        $(".login-wrap.more3").hide();
        $(".login-wrap.error").show();
        $(".login-wrap.error span").html("���벻��Ϊ��");
        setTimeout(function(){
            $(".login-wrap.error").hide();
            $(".login-wrap.more3").show();
        },3000);
        return false;
    }

    $(".login-loading").show();
    var r = Math.random();
    url = "http://user.ooopic.com/user/login.php?action=check_login&returnurl="+""+"&username="+encodeURI(username.val())+"&qiyeUser="+isQiye+"&password="+password.val()+"&r="+r+"&geetest_challenge="+$('input[name=geetest_challenge]').val()+"&geetest_validate="+$('input[name=geetest_validate]').val()+"&geetest_seccode="+$('input[name=geetest_seccode]').val();
    $.ajax({   
        type: "Get",  
        url: url,  
        jsonp: "callback",   
        dataType: "jsonp",
        success: function(data){
            var datas = data.split("|-_-|");

            if(datas[0] == 1){
                var returnUrl = datas[1];
                if( returnUrl== '' ) returnUrl= 'http://user.ooopic.com/u/index.php';
				
				//�����������======start
				var jumpreload = $("#jumpreload").attr('data');
				if(jumpreload==1) {
					console.log("success");
					location.reload();
				}else{
					location.href = returnUrl;
				}
                //�����������======end
                
            }else if(datas[0] == 3){
                $(".login-loading").hide();
                $(".login-wrap.more3").hide();
                $(".login-wrap.error").show();
                $(".login-wrap.error i,.login-wrap.error span").addClass('moretext');
                $(".login-wrap.error span").html(datas[1]);
                yzminit();
                return false;
            }else{
                $(".login-loading").hide();
                $(".qiyeTitle").hide();
                $(".login-wrap.more3").hide();
                $(".login-wrap.error").show();
                $(".login-wrap.error i,.login-wrap.error span").removeClass('moretext');
                $(".login-wrap.error span").html(datas[1]);
                setTimeout(function(){
                    $(".login-wrap.error").hide();
                    $(".login-wrap.more3").show();
                },3000);
                yzminit();
                return false;
            }
        }
   })
}



/**
 * ����input��ֻ����������
 * <input type="text" style="ime-mode:disabled;" onpaste="return false;"  onkeypress="keyPress()" />
 */

function keyPress(_this){
    _this.keyup(function(){
        _this.val(_this.val().replace(/[^0-9.]/g,''));  
    }).bind("paste",function(){ //CTR+V�¼�����  
        _this.val(_this.val().replace(/[^0-9.]/g,''));
    });
}

var captchaObj;
var yzminitflag = 0;
window.yzminit = function(){
    if( yzminitflag == 0 ){
        yzminitflag = 1;
        var a = document.body;
        var b = document.createElement('script');
        // var c = document.createElement('script');
        // c.type = "text/javascript";
        // c.src = "http://static.geetest.com/static/tools/gt.js";
        // a.appendChild(c);
        // $(window).load(function() {
        //     console.log(yzminitflag);
        $.ajax({
            url: "http://user.ooopic.com/StartCaptchaServlet.php?rand=" + Math.round(Math.random() * 100),
            type: "get",
            jsonp: "callback",   
            dataType: "jsonp",
            success: function(data) {
                captchaObj = new Geetest({
                    gt: data.gt,
                    challenge: data.challenge,
                    product: "float",
                    offline: !data.success
                });
                captchaObj.appendTo("#captcha");
                captchaObj.getValidate();
                $('#div_geetest_lib').slideDown('fast');
            }
        });
        $('.login-wrap.more3').css({'margin-top':'16px','margin-bottom':'16px'});
        $('.login-wrap.error').css('margin-top', '8px');
        $('.login-wrap.more3.login-status').css('padding', '0');
        // });
        // b.textContent='$(window).load(function(){$.ajax({url:"../StartCaptchaServlet.php?rand="+Math.round(Math.random()*100),type:"get",dataType:"json",success:function(data){captchaObj=new Geetest({gt:data.gt,challenge:data.challenge,product:"float",offline:!data.success});captchaObj.appendTo("#captcha");captchaObj.getValidate();}});});';
        // b.type = "text/javascript";
        // a.appendChild(b);
        $('#login-submit').on('click', function(e) {
            captchaObj.refresh();
        });
    }
}