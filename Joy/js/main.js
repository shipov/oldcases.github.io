 $(document).ready(function(){
    $(".left_chat_menu li").click(function(){
        $(".vactive").removeClass("vactive");
        $(this).addClass("vactive");
    });
    $(".project_item").click(function(){
        $(".pvactive").removeClass("pvactive");
        $(this).addClass("pvactive");
    });    
    $(".left_user_menu li").click(function(){
        $(".vactive").removeClass("vactive");
        $(this).addClass("vactive");
    });
    $(".setting-menu li").click(function(){
        $(".vactive").removeClass("vactive");
        $(this).addClass("vactive");
    });
    $(".left_menu__star i").click(function(){
        $(this).toggleClass('vactive');
    });
    $(".position span").click(function(){
        $(this).toggleClass('vactive');
    });
    $(".mic").click(function(){
        $(this).toggleClass('active');
    });
    $(".collapse-panel-left").click(function(){
        $(this).toggleClass('active');
    });
    $("a.setting-menu_projectItemLink").click(function(){
        $(this).toggleClass('active');
    });
    $('[data-toggle="tooltip"]').tooltip()

    new WOW().init();
});


 $(".user_menu ul li, .command_chatbot, .command_chatbot i").click(function() {
  $(".user_menu ul li, .command_chatbot, .command_chatbot i").removeClass("active-item");
  $(this).addClass("active-item");
})

$(".widget_body_header_close").click(function(){
    $(".widget_body_header").animate({height: 'toggle'}, "fast");
});
 $(".widget_body_header_close").click(function () {
    $('.chat_msg_wrapper, .widget_body_header_close i').toggleClass("hovered");
});
 $("a.buttons:nth-last-child(1)").click(function () {
    $('a.buttons').toggleClass("hovered");
});

 $(".open").click(function(){
    $(".left_chat_menu, .wrp").animate({width: 'toggle'}, "fast");
});

 $(".collapse-panel-left").click(function(){
    $(".user_menu").animate({width: 'toggle'}, "fast");
});
 $(".collapse-panel-left").click(function(){
    $(".setting-menu, .wrp_all").animate({width: 'toggle'}, "fast");
});

 $(".collapse-panel-left").click(function () {
    $('.container-fluid.pl-5, table.dataTable, .dataTables_length, .dataTables_filter, #settings-chatBot .container, .settings-chatBot, .dataTables_info, .settings-widget h2, .settings-users h2, .settings-sources h2, .settings-templates h2, .dataTables_paginate, .btn_addTemplate, .settings-container, #settings-general .container, #settings-project .container').toggleClass("hovered");
});

 $('.dt-responsive').DataTable( {
    "language": {
        url: "https://cdn.datatables.net/plug-ins/1.10.19/i18n/Russian.json"
    } 
} );
//  $(".collapse-panel-left, .open").click(function(){
//     $(".overlay").fadeToggle();
// });
$(function () {
    $('.button-down').bind("click", function () {
        $('#main_wrapper').stop().animate({scrollTop: $('#main_wrapper')[0].scrollHeight}, 1000);
    });
    $('.button-up').bind("click", function () {
        $('#main_wrapper').animate({ scrollTop: 0 }, 1000);
        return false;
    });
});
$("#login_but").click(function () {
    $('#login_block').toggleClass("del");
});
 $(window).on("load",function(){
    $(".stat-container, .setting_wrapper, .setting-menu, .help-Container").mCustomScrollbar({
        scrollInertia:320,
        setTop: '0',
        axis:"y",
        autoDraggerLength:true,
        autoHideScrollbar:true,
        mouseWheel:{
            enable:true,
            preventDefault:false,
            disableOver:["select","option","keygen","datalist","textarea"]
        },
        theme: "dark",
        advanced:{
            autoExpandHorizontalScroll:false,
            autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
            updateOnContentResize:true,
            updateOnImageLoad:true,
            updateOnSelectorChange:false,
            releaseDraggableSelectors:false
        },
        live:false,
        liveSelector:null
    });  

    $(".phone").mask("+7 (999) 999-99-99");

    $(".setting-menu_wrapper, .chat_msg_wrapper, #widgetTextarea.form-control").mCustomScrollbar({
        scrollInertia:320,
        setTop: '0',
        axis:"y",
        autoDraggerLength:false,
        autoHideScrollbar:true,
        mouseWheel:{
            enable:true,
            preventDefault:false,
            disableOver:["select","option","keygen","datalist"]
        },
        theme: "dark",
        advanced:{
            autoExpandHorizontalScroll:false,
            autoScrollOnFocus:"input,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
            updateOnContentResize:true,
            updateOnImageLoad:true,
            updateOnSelectorChange:false,
            releaseDraggableSelectors:false
        },
        live:false,
        liveSelector:null
    });

    $(".setting-menu_wrapper, .chat_msg_wrapper, #widgetTextarea.form-control").mCustomScrollbar({
        scrollInertia:320,
        setTop: '0',
        axis:"y",
        autoDraggerLength:false,
        autoHideScrollbar:true,
        mouseWheel:{
            enable:true,
            preventDefault:false,
            disableOver:["select","option","keygen","datalist"]
        },
        theme: "dark",
        advanced:{
            autoExpandHorizontalScroll:false,
            autoScrollOnFocus:"input,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
            updateOnContentResize:true,
            updateOnImageLoad:true,
            updateOnSelectorChange:false,
            releaseDraggableSelectors:false
        },
        live:false,
        liveSelector:null
    });

// Popup
        $('.popup_window').hide();
        $('.popup_trigger').on('mousedown', function(){
            $(this).next('.popup_window').fadeToggle();
            return false;
        });
        $('.popup_trigger').on('click', function(){
            return false;
        });

});
