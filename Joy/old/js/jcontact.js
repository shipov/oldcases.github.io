var silent = 1;
var lang_data;
var languages;
var connectors_data;
var domain = (window.location+"").substring(0, (window.location+"").lastIndexOf('/')+1);
var url = domain+"cgi-bin/";
var lang_url = url+"lang.py";
var common_url = url+"common.py";

var delay = 10000;
var socket_delay = 60000;

var last_msgId = 0;
var first_message = 0;
var last_message = 0;
var last_project = 0;
var cClient = '';
var cSource = '';
var cProject = '';
var currentDialog = '';
var cMine = '';
var socket;
var projects = [];
var userType;
var cLastAnswer = new Date(2000, 01, 01, 01, 01, 01, 01);

var langArray = [{shortName: "ru", longName: "Русский"}, {shortName: "en", longName: "English"}];
var langItems = { ru: { menu1: "Клиенты"}, en: { menu1: "Clients"} };

var inTemplate = false;
var fileterd_templates;
var dialogs = [];
var dialogs_data = [];
var operators = [];
var operators_data = [];

var userId = 0;
var filter_projects = '';
var filters = [{name: 'ACTIVE', val: 1}];
var int_chat = false;
var pickers;

$(function() {
    setLoader();
    clearWindow();

    $('#clientsMenu .clients .num').text('');
    $('.forward-list').hide();

    $('.tab li').click(function() {
            $(this).addClass('active').siblings().removeClass('active').parents('#box').find('div.tabbox').hide().eq($(this).index()).fadeIn();
    });

    $('FORM').on('submit', function(){return false;})

    $('#searchFull').keypress(function(event){ if(event.which == 13){searchDialogs();}});

    //   ----------------------
    //      Menu
    //   ----------------------
    $('.left-menu > LI').click(function(){
        changeMainMenu('#'+$(this)[0].id, '#'+$($(this)[0]).attr('divId'));
        int_chat = false;
        if($($(this)[0]).attr('divId') == 'settingsContainer')
        {
            initSettings();
        }
        if($($(this)[0])[0].id == 'operatorsMenu')
        {
            int_chat = true;
            showOperators();
        }
        if($($(this)[0])[0].id == 'clientsMenu' || $($(this)[0])[0].id == 'newChatsMenu')
        {
            int_chat = false;
            clearWindow();
            showDialogs();
        }
    });

    $('.forward').click(function() {
        forwardDialog(this);
    });

    $('.load').click(function(){
        if(currentDialog && cProject)
        {
            var idx = getProjectIndex(cProject);
            var senderName = $('[dialogId='+safeSelector(currentDialog)+'] .blockText H3 SPAN').text();
            if(senderName=="")
            {
                senderName = " ";
            }
            window.open(common_url+'?action=EXPORT_CHAT&source='+cSource+'&dialog='+currentDialog+'&client='+encodeURI(cClient)+'&project='+encodeURI(projects[idx].name)+'&senderName='+encodeURI(senderName), '_blank');
        }
    });

    $('.addchat').click(function() {
        add2Dialog();
    });

    $('.logout').click(function(){
        setLoader(true);
        $.post(common_url, { action: 'LOGOFF' }, function(data) {
            if(responseHandler(data))
            {
                clearWindow();
                $('.chat-list-block LI').remove();
                $('#login_block').show();
            }
            setLoader(false);
        });
    });

    $.post(lang_url, { action: 'LANG' }, function(data) {
        var json = JSON.parse(data);
        if(responseJSONHandler(json))
        {
            languages = json.data;
            lang_data = json.lang_data;
            connectors_data = json.connectors_data;
            fillLangSelector();
        }
        setLoader(false);
    });

    $.post(common_url, { action: 'CHECK' }, function(data) {
        var json = JSON.parse(data);
        if(responseJSONHandler(json, true))
        {
            userType = json.userType;
            userId = json.userId;
            createSocket();
            showMainPage(json.userName, json.needConnector);
        }
    });

    $('#login_but').click(function(){
        setLoader();
        $.post(common_url, {action: "LOGIN", login: $('#account').val(), password: $('#password').val()}, function(data){
            var json = JSON.parse(data);
            if(responseJSONHandler(json))
            {
                userType = json.userType;
                userId = json.userId;
                createSocket();
                showMainPage(json.userName, json.needConnector);
            }
            setLoader(false);
        });
    });

    $('#register_but').click(function(){
        setLoader();
        $.post(common_url, {action: "REGISTER", email: $('#email').val()}, function(data){
            var json = JSON.parse(data);
            if(responseJSONHandler(json))
            {
                if(json.registered == 1)
                {
                    showAlert('Зарегистрирован!');
                } else if(json.registered == 2)
                {
                    showAlert('Такой пользователь уже зарегистрирован!');
                }
            }
            setLoader(false);
        });
    });

    $('#messagesMenu').click(function(){
        setLoader();
        filter_projects = '';
        $('.projects > LI').removeClass('active');
        showDialogs();
    });


    $('.close-question').click(function(){
        closeDialog(this);
    });

    $('.restore').click(function(){
        // restore password
        if($('#account').val() == '')
        {
            showAlert('Не введен логин!');
        } else {
            $.post(common_url, {action: "RESTORE_PASSWORD", email: $('#account').val() }, function(data){
                    var json = JSON.parse(data);
                    if(responseJSONHandler(json))
                    {
                        showAlert('Пароль отправлен на Вашу почту.');
                    } else {
                        showAlert('Такого email в базе нет.');
                    }
                    setLoader(false);
                });
        }
    });

    $(document).mouseup(function (e){
        if(typeof divs2hide != 'undefined')
        {
            for(var i=0;i<divs2hide.length;i++)
            {
                var div = $(divs2hide[i]);
                if (!div.is(e.target) && div.has(e.target).length === 0
                    && !$('.ui-datepicker').is(e.target) && $('.ui-datepicker').has(e.target).length === 0 ) {
                    div.hide();
                }
            }
        }
    });

    $(document).mousedown(function (e) {
          var container = $('.chatMenu_optionPanel');
          if (container.has(e.target).length === 0){
            container.removeClass('block');
          $('.chatMenu_option').removeClass('chatMenu_option_active');
        }
    });

    setInterval(function(){ refreshTime(); }, delay);
    setInterval(function(){ checkSocket(); }, socket_delay);

/*
    $.datepicker.setDefaults( $.datepicker.regional[ "ru" ] );
    pickers = $('.tcal').datepicker({
            showOn: "button",
            buttonImageOnly: true,
            buttonImage: "images_m/calendar.png",
            buttonText:'Нажмите, чтобы выбрать дату',
            timezone: "0000"
        });
*/

    $('.menu-filter_list > LI').click(function(){
        var current = this.id;
        $('.menu-filter_list > LI').removeClass('active');
        $('#'+current).addClass('active');
    });

    $('#menu-filter_apply').click(function(){
        filterDialogs();
    });

    $('#menu-filter_active').addClass('active');
    $('#menu-filter_reset').click(function(){
        $('.menu-filter_list > LI.active').removeClass('active');
        $('.projects_select > LI.active').removeClass('active');
        $(pickers[0]).val('');
        $(pickers[1]).val('');
        $('#menu-filter_active').addClass('active');
        filterDialogs();
    });
});

function fillProjectsFilter()
{
    $('.projects_select').html('');
    var str = ''
    for(var i=0;i<projects.length;i++)
    {
        str += '<li class="projects_boxItem" project="'+projects[i].id+'"></li>';
    }
    $('.projects_select').html(str);
    for(var i=0;i<projects.length;i++)
    {
        $('.projects_select [project='+projects[i].id+']').text(projects[i].name);
    }
    $('.projects_select > LI').click(function(){
        var hasClass = $(this).hasClass('active');
        if(!hasClass)
        {
            $(this).addClass('active');
        } else {
            $(this).removeClass('active');
        }
    });
}


function filterDialogs()
{
    filters = [];
    if($(pickers[0]).val()!="")
    {
        filters.push({name:'DATE_FROM', val: getDateString(pickers[0].id) });
    }
    if($(pickers[1]).val()!="")
    {
        filters.push({name:'DATE_TO', val: getDateString(pickers[1].id) });
    }
    $('.menu-filter_list > LI.active').each(function(idx, elem){
        if(elem.id == 'menu-filter_active')
        {
            filters.push({name:'ACTIVE', val: 1 });
        }
        if(elem.id == 'menu-filter_unanswered')
        {
            filters.push({name:'UNANSWERED', val: 1 });
        }
        if(elem.id == 'menu-filter_closed')
        {
            filters.push({name:'CLOSED', val: 1 });
        }
        if(elem.id == 'menu-filter_favorites')
        {
            filters.push({name:'FAVORITES', val: 1 });
        }
    });
    $('.projects_select > LI.active').each(function(idx, elem){
        filters.push({name:'PROJECTS', val: $(elem).attr('project') });
    });
    setLoader();
    $('.menu-filter').fadeOut(300);
    showDialogs();
}

function getDateString(pickerId)
{
    var vx = $('#'+pickerId).datepicker('getDate');
    return vx.getFullYear()+'-'+('0'+(vx.getMonth()+1)).slice(-2)+'-'+('0'+vx.getDate()).slice(-2);
}

function searchDialogs()
{
    setLoader();
    showDialogs();
}

function createSocket()
{
    try {
        if((window.location+"").startsWith('https'))
        {
            socket = new WebSocket('wss://'+domain.substring(domain.indexOf('//')+2)+'wss');
        } else {
            socket = new WebSocket('ws://'+domain.substring(domain.indexOf('//')+2)+'wss');
        }
        socket.onopen = function () {
            try
            {
               socket.send(JSON.stringify({'user': userId, 'operators': operators, 'dialogs': dialogs}));
            }
            catch(err) {}
        };

        socket.onerror = function (event) { // alert(event.code); 
        };
        socket.onmessage = function (event) {
            if(event.data != 'PING')
            {
                var json = JSON.parse(event.data);
                // Dialog closed
                if(json.result == 6)
                {
                    if(currentDialog == json.data)
                    {
                        showAlert('Чат принят другим оператором.');
                        clearWindow(true);
                    }
                    $('#fullList [dialogId='+json.data+']').remove();
                    var dialog_index = dialogs.indexOf(json.data*1);
                    if(dialog_index >= 0)
                    {
                        dialogs.splice(dialog_index, 1);
                    }
                }
                // New dialog
                if(json.result == 7)
                {
                    if(!hasDialog(json.data))
                    {
                        $.post(common_url, { action: 'GET_CLIENTS', search: $('#searchFull').val(), dialog: json.data, projects: filter_projects }, function(data) {
                            var json = JSON.parse(data);
                            var t_dialog = getDialogData(json.data[0].dialog);
                            if(t_dialog == null)
                            {
                                dialogs_data.push(json.data[0]);
                            }
                            if(!dialogs.includes(json.data[0].dialog))
                            {
                                dialogs.push(json.data[0].dialog);
                            }
                            if(responseJSONHandler(json))
                            {
                                for(var i=0;i<json.data.length;i++)
                                {
                                    setDialogData(json.data[i]);
                                }
                                dialogsChanged();
                            }
                            try
                            {
                                socket.send(JSON.stringify({'dialogs': dialogs}));
                            }
                            catch(err) {}

                        });
                    }
                }
                // New message
                if(json.result == 5)
                {
                    if(currentDialog == json.data)
                    {
                        if(hasDialog(json.data))
                        {
                            $.post(common_url, {action: 'GET_CLIENT_MESSAGES', dialog: currentDialog, from: last_message}, function(jdata) {
                                var j = JSON.parse(jdata);
                                if(responseJSONHandler(j))
                                {
                                    refreshMessages(j, 1);
                                    refreshTime();
                                    $('.chat-content_scroll').mCustomScrollbar("scrollTo", 'bottom', { scrollInertia:0 });
                                }
                                setLoader(false);
                            });
                            $.post(common_url, { action: 'GET_CLIENTS', search: $('#searchFull').val(), dialog: json.data, projects: filter_projects }, function(data) {
                                var json = JSON.parse(data);
                                if(responseJSONHandler(json))
                                {
                                    for(var i=0;i<json.data.length;i++)
                                    {
                                        setDialogData(json.data[i]);
                                    }
//                                    dialogsChanged();
                                }
                            });
                        }
                    } else {
                        if(hasDialog(json.data))
                        {
                            $.post(common_url, { action: 'GET_CLIENTS', search: $('#searchFull').val(), dialog: json.data, projects: filter_projects }, function(data) {
                                var json = JSON.parse(data);
                                if(responseJSONHandler(json))
                                {
                                    for(var i=0;i<json.data.length;i++)
                                    {
                                        setDialogData(json.data[i]);
                                    }
                                    dialogsChanged();
                                }
                            });
                        }
                    }
                }
                // New chat message
                if(json.result == 8)
                {
                    if(currentDialog == json.data)
                    {
                        if(hasDialog(json.data))
                        {
                            $.post(common_url, {action: 'CHAT_MESSAGES', dialog: currentDialog, from: last_message}, function(jdata) {
                                var j = JSON.parse(jdata);
                                if(responseJSONHandler(j))
                                {
                                    refreshMessages(j, 1);
                                    refreshTime();
                                    $('.chat-content_scroll').mCustomScrollbar("scrollTo", 'bottom', { scrollInertia:0 });
                                }
                                setLoader(false);
                            });
                        }
                    } else {
                        if(hasDialog(json.data))
                        {
                            $.post(common_url, { action: 'CHAT_OPERATORS', search: $('#searchFull').val(), dialog: json.data }, function(data) {
                                var json = JSON.parse(data);
                                if(responseJSONHandler(json))
                                {
                                    for(var i=0;i<json.data.length;i++)
                                    {
                                        setOperatorsData(json.data[i]);
                                    }
                                    operatorsChanged();
                                }
                            });
                        }
                    }
                }
            }
        };
    }
    catch(error){
    }
}

function hasProject(id)
{
    for(var i=0;i<projects.length;i++)
    {
        if(projects[i].id == id)
        {
            return true;
        }
    }
    return false;
}

function fillLangSelector()
{
    var txt = '';
    for(var i=0;i<languages.length;i++)
    {
        if(txt!='')
        {
            txt += '&nbsp;';
        }
        txt += '<a href="#" lang_id="'+languages[i].id+'">'+languages[i].name+'</a>';
    }
    $('.lang').html(txt);
    $('.reg_lang').html(txt);
    $('.lang A').click(function(){
        setLang($(this).attr('lang_id'));
    });
    $('.reg_lang A').click(function(){
        setLang($(this).attr('lang_id'));
    });
}

function setLang(lang)
{
    for(var i=0;i<lang_data.length;i++)
    {
        if(lang_data[i].language == lang)
        {
            $('[lang='+lang_data[i].name+']').text(lang_data[i].val);
        }
    }
}


function showAlert(str)
{
    alert(str);
}

// ---------------
//      Operators
// ---------------

function showOperators()
{
    setLoader();
    $('.forward').parent().hide();
    $('.addchat').parent().hide();
    try
    {
        socket.send(JSON.stringify({'user': userId}));
    }
    catch(err) {}

    $.post(common_url, { action: 'CHAT_OPERATORS', search: $('#searchFull').val() }, function(data) {
        var json = JSON.parse(data);
        if(responseJSONHandler(json))
        {
            operators = [];
            operators_data = json.data;
            $('.chat-list-block LI').remove();
            for(var i=0;i<json.data.length;i++)
            {
                setOperatorsData(json.data[i]);
            }
            operatorsChanged();
            try
            {
                socket.send(JSON.stringify({'operators': operators}));
            }
            catch(err) {}
        }
        setLoader(false);
    });
}

function operatorsChanged()
{
    sortDialogs();
    $('#fullList LI').unbind( "click" );
    $('#fullList LI').click(function(){
        currentDialog = $(this).attr('dialogId');
        last_message = 0;
        first_message = 0;

        $('.chat-list-block LI').removeClass('active');
        $(this).addClass('active');
        $('.chat-window-head .blockText H3').text($('[dialogId='+currentDialog+'] .blockText H3 SPAN').text());
        $('.chat-window-head .blockText P').text('');
        $('.chat-window-head .pAvatar').text('');
        first_message = 0;
        last_message = 0;
        last_msgId = 0;
        $('.chat-content').html('');
        m_hasScroll = true;
        loadOperatorsMessages(1);
    });

    $('.chatMenu_option').unbind( "click" );
    $('.chatMenu_option').on('click', function(){
        $(this).append($('.chatMenu_optionPanel'));
        $(this).children('.chatMenu_optionPanel').toggleClass('block');
        $(this).toggleClass('chatMenu_option_active');
      });

    $('.chatMenu_important').unbind('click');
    $('.chatMenu_important').click(function() { toggleOperatorsFavorite(!$(this).hasClass('active'), $(this).parent().parent().parent().attr('dialogid'));});

    refreshTime();
}


//////////////
// Show dialogs
//////////////

function showDialogs()
{
    $.post(common_url, { action: 'GET_CLIENTS', search: $('#searchFull').val(), projects: filter_projects, filter: JSON.stringify(filters) }, function(data) {
        var json = JSON.parse(data);
        if(responseJSONHandler(json))
        {
            dialogs = [];
            dialogs_data = json.data;
            $('.chat-list-block LI').remove();
            if(json.data.length>0)
            {
                $('#clientsMenu .clients .num').text(json.data.length);
            } else {
                $('#clientsMenu .clients .num').text('');
            }
            for(var i=0;i<json.data.length;i++)
            {
                setDialogData(json.data[i]);
            }
            dialogsChanged();
            try
            {
                socket.send(JSON.stringify({'dialogs': dialogs}));
            }
            catch(err) {}

        }
        setLoader(false);
    });
}

function dialogsChanged()
{
    sortDialogs();
    $('#fullList LI').unbind( "click" );
    $('#fullList LI').click(function(){
        currentDialog = $(this).attr('dialogId');
        cSource = $(this).attr('sourceId');
        cProject = $(this).attr('projectId');
        cMine = $(this).attr('mine');
        last_message = 0;
        first_message = 0;

        var pIdx = getProjectIndex(cProject);

        $('.chat-header_project P:first').text(projects[pIdx].name);
        $('.chat-list-block LI').removeClass('active');
        $(this).addClass('active');
        $('.chat-window-head .pAvatar').css('background', getProjectColor(pIdx));
        if(projects[pIdx].hasLogo)
        {
            $('.chat-window-head .pAvatar').html('<img src="/cgi-bin/get_user_pic.py?action=GET_PROJECT_PIC&logo='+cProject+'" class="mCS_img_loaded">');
        } else {
            $('.chat-window-head .pAvatar').text(getProjectText(pIdx));
        }
        if(projects[pIdx].forward_enabled)
        {
            $('.forward').parent().show();
        } else {
            $('.forward').parent().hide();
        }
        if(projects[pIdx].add_enabled)
        {
            $('.addchat').parent().show();
        } else {
            $('.addchat').parent().hide();
        }
        $('.chat-window-head .blockText H3').text($('[dialogId='+currentDialog+'] .blockText H3 SPAN').text());
        $('.chat-window-head .blockText P').text('');
        $('.chat-window-head .pAvatar').text('');
        first_message = 0;
        last_message = 0;
        last_msgId = 0;
        $('.chat-content').html('');
        m_hasScroll = true;
        loadMessages(1);
    });

    $('.chatMenu_option').unbind( "click" );
    $('.chatMenu_option').on('click', function(){
        $(this).append($('.chatMenu_optionPanel'));
        $(this).children('.chatMenu_optionPanel').toggleClass('block');
        $(this).toggleClass('chatMenu_option_active');
      });

    $('.chatMenu_important').unbind('click');
    $('.chatMenu_important').click(function() { toggleFavorite(!$(this).hasClass('active'), $(this).parent().parent().parent().attr('dialogid'));});

    refreshTime();
}

// ---------------
//      Projects
// ---------------

function addProject(mId, mNum)
{
    var pIdx = getProjectIndex(mId);
//    $('.projects').append('<li id="prj_'+last_project+'"><a href="#"><span class="pAvatar"></span></a><span class="num"></span></li>;');
    $('.projects').append('<li id="prj_'+last_project+'" class="flex_column"><a href="#"><span class="pAvatar"><span class="projects_avatar"></span><span class="num"></span></span><p class="projects_name"></p></a></li>');
    $('#prj_'+last_project).attr('projectId', mId);
    $('#prj_'+last_project+' .num').text(mNum);
    $('#prj_'+last_project+' .projects_name').text(projects[pIdx].name);

    $('#prj_'+last_project+' .pAvatar').css('background', getProjectColor(pIdx));
    if(projects[pIdx].hasLogo)
    {
        $('#prj_'+last_project+' .projects_avatar').html('<img src="/cgi-bin/get_user_pic.py?action=GET_PROJECT_PIC&logo='+mId+'" class="mCS_img_loaded">');
    } else {
        $('#prj_'+last_project+' .projects_avatar').text(getProjectText(pIdx));
    }
    last_project++;
}

function getProjectIndex(pId)
{
    for(var i=0;i<projects.length;i++)
    {
        if(projects[i].id == pId)
        {
            return i;
        }
    }
    return -1;
}

function getProjectColor(idx)
{
    if(idx>=0 && projects[idx].color!='')
    {
        return '#'+projects[idx].color;
    }
    return '#efefef';
}

function getProjectText(idx)
{
    if(idx>=0)
    {
        if(projects[idx].short_name.trim()!='')
        {
            return projects[idx].short_name.trim().substr(0,2);
        }
        var mTitle = projects[idx].name.trim();
        if(mTitle.indexOf(' ')==-1)
        {
            return mTitle.substr(0,2).toUpperCase();
        } else {
            return (mTitle.substr(0,1)+mTitle.substr(mTitle.indexOf(' ')+1, 1)).toUpperCase();
        }
    }
    return '';
}

function showMainPage(uName, needConnector)
{
    setLoader();
    $('#username').text(uName);
    $('#login_block').hide();
    $('.menu-operator A').text(uName);

    try
    {
        socket.send(JSON.stringify({'user': userId}));
    }
    catch(err) {}

    $.post(common_url, { action: 'GET_PROJECTS' }, function(data) {
        var json = JSON.parse(data);
        if(responseJSONHandler(json))
        {
            $('.projects').html('');
            last_project = 0;
            projects = json.data;
            templates = json.templates;
            autoreplaces = json.autoreplaces;
            autoreplaces.sort(function(a, b) { return b.template.length - a.template.length;});
            for(var i=0;i<projects.length;i++)
            {
                addProject(projects[i].id, projects[i].num);
            }
            $('.projects > LI').unbind('click');
            $('.projects > LI').click(function(){
                setLoader();
                var tId = $(this).attr('id');
                $('.projects > LI').removeClass('active');
                $('#'+tId).addClass('active');
                filter_projects = projects[tId.substr(4)].id;
                showDialogs();
            });
            if(needConnector)
            {
                st_projectId = projects[0].id;
                addConnectorPopup();
            }
            fillProjectsFilter();
        }
        clearWindow();
        showDialogs();
    });
}

//////////////////////////////////////

function refreshTime()
{
    $('.chat-list-block LI').each(function(idx, item){
        var lastAnswer = $(item).attr('lastAnswer');
        if(lastAnswer!=undefined && lastAnswer!='')
        {
            $('#'+$(item).attr('id')+' .timeChat').text(getTimeStr($(item).attr('lastAnswer')));
            var minutesPassed = getTimeFromNow(getDateFromString($(item).attr('lastAnswer')));
            var pIdx = getProjectIndex($(item).attr('projectId'));
            if(pIdx >=0 )
            {
                if(projects[pIdx].long_value !=0 && projects[pIdx].long_value < minutesPassed)
                {
                    $(item).css('background-color', '#ff0000')
                } else {
                    $(item).css('background-color', '#ffffff')
                }
            }
        }
    });
}

function hasDialog(dialog)
{
    var ret = false;
    $('#fullList > LI').each(function(idx, item){
        if($(item).attr('dialogId') == dialog)
        {
            ret = true;
            return ret;
        }
    });
    return ret;
}

function sortDialogs()
{
    var answerDates = [];
    $('#fullList LI').each(function(idx, item){
        answerDates.push({id: $(item).attr('id'), val: getDateFromString($(item).attr('lastAnswer'))});
    });
    answerDates = answerDates.sort(function(a,b) {return (a.val > b.val) ? 1 : ((b.val > a.val) ? -1 : 0);});
    var htmlData = "";
    for(var i=0;i<answerDates.length;i++)
    {
        htmlData += $('#'+answerDates[i].id).wrap('<p/>').parent().html();
    }
    $('#fullList').html(htmlData);
}

/////////////////////////////
// Dialog actions
/////////////////////////////

function closeChat()
{
    clearWindow();
    $('[dialogId='+safeSelector(currentDialog)+']').remove();
    //
    currentDialog = '';
    cProject = 0;
}


function setMineDialog()
{
    if(!int_chat)
    {
        setLoader();
        $.post(common_url, {action: "SET_MINE", dialog: currentDialog}, function(data){
            var json = JSON.parse(data);
            if(responseJSONHandler(json))
            {
                cMine = 1;
                $('[dialogId='+safeSelector(currentDialog)+']').attr('mine', cMine);
            }
            setLoader(false);
        });
    }
}

function add2Dialog()
{
    if($('.add-list').css('display') == 'none' && currentDialog)
    {
        setLoader(true);
        $('.add-list .modalAdd_dialogScroll').html('');
        $.post(common_url, { action: 'GET_OPERATORS', dialog: currentDialog }, function(data) {
            var json = JSON.parse(data);
            if(responseJSONHandler(json))
            {
                for(var i=0;i<json.data.length;i++)
                {
                    $('.add-list .modalAdd_dialogScroll').append('<div class="modalAdd_dialogItem modal_dialogItem" id="fwd_'+json.data[i].id+'" real_id="'+json.data[i].id+'"><h3></h3><div class="flex_row modalAdd_dialogComment modal_dialogComment"><input type="text" class="input modalAdd_dialogInput" placeholder="Комментарий для операторов"><button type="button" class="modalAdd_dialogButton"><span></span></button></div></div>');
                    $('#fwd_'+json.data[i].id+' H3').text(json.data[i].name);
                }
                $('.add-list .modalAdd_dialogItem H3').click(function(){
                    var isVisible = $(this).parent().hasClass('active');
                    $('.add-list .modalAdd_dialogItem').removeClass('active');
                    if(!isVisible)
                    {
                        $(this).parent().addClass('active');
                        var rId = $(this).parent().attr('real_id');
                        isVisible = $('[real_id='+rId+'] .modal_dialogComment').css('display') != 'none';
                        $('.modal_dialogComment').hide();
                        if(!isVisible)
                        {
                            $('[real_id='+rId+'] .modal_dialogComment').css('display', 'flex');
                        }
                        $('[real_id='+rId+'] button').unbind('click');
                        $('[real_id='+rId+'] button').click(function(){
                            add2Dialog2Server(rId);
                        });
                    } else {
                        $('.modal_dialogComment').hide();
                    }
                });
            }
            $('.add-list').fadeToggle();
            setLoader(false);
        });
    }
}

function add2Dialog2Server(rId)
{
    setLoader(true);
    $.post(common_url, { action: 'ADD', user: rId, dialog: currentDialog, comment: $('.add-list .modal_dialogItem.active .modalAdd_dialogInput').val() }, function(data) {
        if(responseHandler(data))
        {
            $('.add-list').hide();
        }
        setLoader(false);
    });
    removePopup();
}

function forwardDialog(item)
{
    if(currentDialog)
    {
        setLoader(true);
        $('.forward-list .modalForward_dialogScroll').html('');
        $.post(common_url, { action: 'GET_OPERATORS', dialog: currentDialog, source: cSource }, function(data) {
            var json = JSON.parse(data);
            if(responseJSONHandler(json))
            {
                for(var i=0;i<json.data.length;i++)
                {
                    $('.forward-list .modalForward_dialogScroll').append('<div class="modalAdd_dialogItem modal_dialogItem" id="fwd_'+json.data[i].id+'" real_id="'+json.data[i].id+'"><h3></h3><div class="flex_row modalForward_dialogComment modal_dialogComment"><input type="text" class="input modalForward_dialogInput" placeholder="Комментарий для операторов"><button type="button" class="modalForward_dialogButton"><span></span></button></div></div>');
                    $('#fwd_'+json.data[i].id+' H3').text(json.data[i].name);
                }


                $('.forward-list .modalAdd_dialogItem H3').click(function(){
                    var isVisible = $(this).parent().hasClass('active');
                    $('.forward-list .modalAdd_dialogItem').removeClass('active');
                    if(!isVisible)
                    {
                        $(this).parent().addClass('active');
                        var rId = $(this).parent().attr('real_id');
                        isVisible = $('[real_id='+rId+'] .modal_dialogComment').css('display') != 'none';
                        $('.modal_dialogComment').hide();
                        if(!isVisible)
                        {
                            $('[real_id='+rId+'] .modal_dialogComment').css('display', 'flex');
                        }
                        $('[real_id='+rId+'] button').unbind('click');
                        $('[real_id='+rId+'] button').click(function(){
                            forwardDialog2Server(rId);
                        });
                    } else {
                        $('.modal_dialogComment').hide();
                    }
                });
            }
            $('.forward-list').fadeToggle();
            setLoader(false);
        });
    }
}

function forwardDialog2Server(rId)
{
    setLoader(true);
    $.post(common_url, { action: 'FORWARD', user: rId, dialog: currentDialog, comment: $('.forward-list .modal_dialogItem.active .modalForward_dialogInput').val() }, function(data) {
        if(responseHandler(data))
        {
            closeChat();
            $('.forward-list').hide();
        }
        setLoader(false);
    });
    removePopup();
}

function sendCloseDialog(closeForMe)
{
    setLoader();
    $.post(common_url, {action: "SET_FINISHED", dialog: currentDialog, forMe: closeForMe}, function(data){
        var json = JSON.parse(data);
        if(responseJSONHandler(json))
        {
            closeChat();
        }
        setLoader(false);
    });
}

function closeDialog()
{
    if(currentDialog!='')
    {
        var operators = $('[dialogId='+safeSelector(currentDialog)+']').attr('operators');
        if(operators>0)
        {
            $('#dialog').text('Покинуть чат или закрыть чат?');
                dialog = $('#dialog').dialog(
                {
                    modal:true,
                    buttons:{
                        'Покинуть':function() {
                            sendCloseDialog(1);
                            dialog.dialog( "close" );
                         },
                         'Закрыть':function() {
                            sendCloseDialog(0);
                            dialog.dialog( "close" );
                          },
                         'Отменить':function() {
                            dialog.dialog( "close" );
                          }
                    }
                }
            );
        } else {
            $('#dialog').text('Закрыть чат?');
                dialog = $('#dialog').dialog(
                {
                    modal:true,
                    buttons:{
                         'Закрыть':function() {
                            sendCloseDialog(0);
                            dialog.dialog( "close" );
                          },
                         'Отменить':function() {
                            dialog.dialog( "close" );
                          }
                    }
                }
            );
        }
    }
}
