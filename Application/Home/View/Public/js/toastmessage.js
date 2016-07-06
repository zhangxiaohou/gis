
/**
 *  This JQuery Plugin will help you in showing some nice Toast-Message like notification messages. The behavior is
 *  similar to the android Toast class.
 *  You have 4 different toast types you can show. Each type comes with its own icon and colored border. The types are:
 *  - notice
 *  - success
 *  - warning
 *  - error
 *
 *  The following methods will display a toast message:
 *
 *   $().toastmessage('showNoticeToast', 'some message here');
 *   $().toastmessage('showSuccessToast', "some message here");
 *   $().toastmessage('showWarningToast', "some message here");
 *   $().toastmessage('showErrorToast', "some message here");
 *
 *   // user configured toastmessage:
 *   $().toastmessage('showToast', {
 *      text     : 'Hello World',
 *      sticky   : true,
 *      position : 'top-right',
 *      type     : 'success',
 *      close    : function () {console.log("toast is closed ...");}
 *   });
 *

 *   Author: Daniel Bremer-Tonn
 **/
(function($)
{
    var settings = {
        inEffect: 			{opacity: 'show'},	// in effect
        inEffectDuration: 	20,				// in effect duration in miliseconds
        stayTime: 			3000,				// time in miliseconds before the item has to disappear
        text: 				'',					// content of the item. Might be a string or a jQuery object. Be aware that any jQuery object which is acting as a message will be deleted when the toast is fading away.
        sticky: 			false,				// should the toast item sticky or not?
        type: 				'notice', 			// notice, warning, error, success
        position:           'top-right',        // top-left, top-center, top-right, middle-left, middle-center, middle-right ... Position of the toast container holding different toast. Position can be set only once at the very first call, changing the position after the first call does nothing
        closeText:          '',                 // text which will be shown as close button, set to '' when you want to introduce an image via css
        close:              null,                // callback function when the toastmessage is closed

    };

    var methods = {
        init : function(options)
        {
            if (options) {
                $.extend( settings, options );
            }
        },

        showToast : function(options)
        {
            var localSettings = {};
            $.extend(localSettings, settings, options);

            // declare variables
            var toastWrapAll, toastItemOuter, toastItemInner, toastItemClose, toastItemImage;

            toastWrapAll	=  $('<div></div>').addClass('toast-container').addClass('toast-position-' + localSettings.position).appendTo('body').click(function() { $().toastmessage('removeToast',toastItemInner, localSettings) }) ;
            toastItemOuter	= $('<div></div>').addClass('toast-item-wrapper');
            toastItemInner	= $('<div></div>').hide().addClass('toast-item toast-type-' + localSettings.type).appendTo(toastWrapAll).html($('<p>').append (localSettings.text)).animate(localSettings.inEffect, localSettings.inEffectDuration).wrap(toastItemOuter);

            if(navigator.userAgent.match(/MSIE 6/i))
            {
                toastWrapAll.css({top: document.documentElement.scrollTop});
            }

            if(!localSettings.sticky)
            {
                setTimeout(function()
                    {
                        $().toastmessage('removeToast', toastItemInner, localSettings);
                    },
                    localSettings.stayTime);
            }
            return toastItemInner;
        },

        showNoticeToast : function (message)
        {
            var options = {text : message, type : 'notice'};
            return $().toastmessage('showToast', options);
        },

        showSuccessToast : function (message)
        {
            var options = {text : message, type : 'success'};
            return $().toastmessage('showToast', options);
        },

        showErrorToast : function (message)
        {
            var options = {text : message, type : 'error'};
            return $().toastmessage('showToast', options);
        },

        showWarningToast : function (message)
        {
            var options = {text : message, type : 'warning'};
            return $().toastmessage('showToast', options);
        },

        removeToast: function(obj, options)
        {
            obj.animate({opacity: '0'}, 2500, function()
            {
                obj.parent().animate({height: '0px'}, 1600, function()
                {
                    obj.parent().remove();
                });
            });
            // callback
            if (options && options.close !== null )
            {
                options.close();
            }
        }
    };

    $.fn.toastmessage = function( method ) {

        // Method calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.toastmessage' );
        }
    };

})(jQuery);
var toumingFlag=true;
function touming(text,sticky){
    if(!sticky){sticky = false;}
    if(toumingFlag){
        toumingFlag=false;
        $().toastmessage('showToast', {
            stayTime : 1000,
            text     : text,
            sticky   : sticky,
            position : 'middle-center',
            close :function(){
                toumingFlag=true;
            }
        });
    }
}
