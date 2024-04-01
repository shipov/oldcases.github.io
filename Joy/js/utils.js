var dict_yesNo = [{id:0, name:'Нет'}, {id:1, name:'Да'}];
var divs2hide = ['.menu-filter', '.add-list', '.forward-list','.overlay_modal'];

function changeMainMenu(selectedMenu, selectedDiv)
{
    $('.left-menu > LI').removeClass('active');
    $('#mainContainer > DIV').hide();
    $(selectedDiv).show();
    $(selectedDiv).css('display', 'flex');
    $(selectedMenu).addClass('active');
}

function clearWindow()
{
    $('.chat-window-head .pAvatar').css('background', '#fff');
    $('.chat-window-head .pAvatar').text('');
    $('.chat-window-head .blockText H3').text('');
    $('.chat-window-head .blockText P').text('');
    $('.chat-content').text('');
}

function checkSocket()
{
    if(!socket || socket.readyState != 1)
    {
        createSocket();
    } else {
        socket.send('PING');
        if(socket.readyState != 1)
        {
            createSocket();
        }
    }
}

function setLoader(visible=true)
{
    if(visible)
    {
        $('#loader_block').show();
    } else {
        $('#loader_block').hide();
    }
}

function getDateFromString(str)
{
    if(str == undefined || str == null || str == '')
    {
        return new Date();
    }
    var reg = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
    var data = reg.exec(str); 
    return new Date((+data[1]),(+data[2])-1,(+data[3]),(+data[4]),(+data[5]),(+data[6]));
}

function getTimeFromNow(date)
{
    var today = new Date();
    return Math.round((today-date)/60000);
}

function getTimeStr(str)
{
    var min = getTimeFromNow(getDateFromString(str));
    if(min<60)
    {
        return min+"m";
    }
    if(min<60*24)
    {
        return Math.floor(min/60)+ "h "+ (min%60)+"m";
    }
    if(min>=60*24)
    {
        var d=Math.floor(min/(60*24));
        return d+ "d "+ Math.floor((min - d*60*24)/60)+ "h "+ ((min - d*60*24)%60)+"m";
    }
}

function setSelectOptions(selector, array)
{
    var str = '';
    for(var i=0; i<array.length; i++)
    {
        str+='<option value="'+array[i].id+'">'+safeHTMLText(array[i].name)+'</option>';
    }
    $(selector).html(str);
}

function safeSelector(sel)
{
    if(sel == undefined)
    {
        return "";
    }
    return sel.replace(/([ #;&,.+*~\':"!^$[\]()=>|\/@])/g,'\\$1');
}

function safeHTMLText(str)
{
    if(str == null)
    {
        return '';
    }
    return (str+'').replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;').replace('"','&quot;');
}

function upperCaseFirstLetter(str)
{
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function responseHandler(data, silent)
{
    var json = JSON.parse(data);
    return responseJSONHandler(json, silent);
}

function responseJSONHandler(json, silent)
{
    if(json.result == 1)
    {
        return true;
    }
    if(json.result == 2)
    {
        return false;
    }
    if(json.result == 3)
    {
        if(!silent)
        {
            showAlert('Неправильный логин или пароль.');
        }
        return false;
    }

    return false;
}

function initTable(table, columns)
{
    $(table+' THEAD').html(getTR(columns, '', true));
    $(table+' TBODY').html('');
    for(var i=0;i<columns.length;i++)
    {
        if(columns[i].name!='')
        {
            $(table+' THEAD [col='+i+'] .th_text').text(columns[i].name);
        }
    }
}

function setTableData(table, columns, data)
{
    $(table+' TBODY').html('');
    for(var i=0;i<data.length;i++)
    {
        $(table+' TBODY').append(getTR(columns, data[i].id));
        for(var j=0;j<columns.length;j++)
        {
            if(columns[j].id!=undefined && columns[j].id!='')
            {
                var val = data[i][columns[j].id];
                if('dict' in columns[j] && columns[j].dict!=undefined && columns[j].dict!='')
                {
                    var dict = eval(columns[j].dict);
                    var values = (val+"").split(/,/);
                    val = '';
                    for(var k=0;dict!=undefined && k<dict.length;k++)
                    {
                        for(var l=0;l<values.length;l++)
                        {
                            if(dict[k].id == values[l])
                            {
                                if(val!='')
                                {
                                    val += '\n';
                                }
                                val += dict[k].name;
                                break;
                            }
                        }
                    }
                }
                $(table+' TBODY [row='+data[i].id+'] [col='+j+']').text(val);
                if('dict' in columns[j] && columns[j].dict!=undefined && columns[j].dict!='')
                {
                    var txt = $(table+' TBODY [row='+data[i].id+'] [col='+j+']').html();
                    txt = (txt+"").replace('\n', '<br>');
                    $(table+' TBODY [row='+data[i].id+'] [col='+j+']').html(txt);
                }
                if('type' in columns[j] && columns[j].type!=undefined && columns[j].type=='checkbox')
                {
                    $(table+' TBODY [row='+data[i].id+'] [col='+j+']').html('<input type="checkbox">');
                    if(val == "0")
                    {
                        $(table+' TBODY [row='+data[i].id+'] [col='+j+'] INPUT')[0].checked = false;
                    }
                    if(val == "1")
                    {
                        $(table+' TBODY [row='+data[i].id+'] [col='+j+'] INPUT')[0].checked = true;
                    }
                    if(val == "2")
                    {
                        $(table+' TBODY [row='+data[i].id+'] [col='+j+'] INPUT')[0].indeterminate = true;
                    }
                }
            }
        }
    }
}

function getTR(columns, rowId='', head=false)
{
    var str = '<tr'+(rowId == '' ? '': ' row="'+rowId+'" class="settings-templates_row"')+'>';
    for(var i=0;i<columns.length;i++)
    {
        if(head)
        {
            str += '<th col='+i+'><span class="settings-templates_row flex_row"><a class="th_text"></a><span class="settings-templates_sort"><i class="fas fa-long-arrow-alt-up"></i></span></span></th>';
        } else {
            str += '<td col='+i+'></td>';
        }
    }
    return str + '</tr>';
}

function copy_clip(txt)
{
    var clip_area = document.createElement("textarea");
    clip_area.style.position = 'fixed';
    clip_area.style.top = 0;
    clip_area.style.left = 0;
    clip_area.style.border = 'none';
    clip_area.style.width = '1em';
    clip_area.style.height = '1em';
    clip_area.value = txt;
    document.body.appendChild(clip_area);
    clip_area.select();
    document.execCommand('copy');
    document.body.removeChild(clip_area);
}

function sendFile(fileElement, file_action, params, callbackFunction = null)
{
    setLoader();
    var allData = new FormData($('#sendForm')[0]);
//        allData.append('action', int_chat ? "CHAT_SEND_MESSAGE" : "SEND_MESSAGE");
    allData.append('action', file_action);
    for(var i=0;i<params.length;i++)
    {
        allData.append(params[i].name, params[i].val);
    }
//        allData.append('dialog', currentDialog);
    allData.append('txt', fileElement.files[0].name);
    allData.append('blob', fileElement.files[0]);
    $.ajax({
        url: common_url,
        type: 'POST',
        data: allData,
        cache: false,
        contentType: false,
        processData: false,
        xhr: function() {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                myXhr.upload.addEventListener('progress', function(e) {
                    if (e.lengthComputable) {
                        $('progress').attr({
                            value: e.loaded,
                            max: e.total,
                        });
                    }
                } , false);
            }
            return myXhr;
        },
        complete: function(data) {
            try {
                var json = JSON.parse(data.responseText);
                if(responseJSONHandler(json))
                {
                    if(callbackFunction!=null)
                    {
                        callbackFunction(true);
                    }
                    setLoader(false);
                } else {
                    showAlert('Ошибка');
                    callbackFunction(false);
                    setLoader(false);
                }
            }
            catch(err) {setLoader(false);}
        },
    });
}
