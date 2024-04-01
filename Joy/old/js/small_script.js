$(function() {
  $('.left-menu_item').click(function(){
    $('.mainContainer').css('display', 'none');
    $('#'+$(this).attr('divid')).css('display', 'flex');
    $('.left-menu_item').removeClass('active');
    $(this).addClass('active');
  });

  $('.setting-project_item').click(function(){
    $('.settings-container').css('display', 'none');
    $('.'+$(this).attr('divname')).css('display', 'block');
    $('.setting-project_item').removeClass('active');
    $(this).addClass('active');
  });

  $('.stat_item').click(function(){
    $('.stat-container').css('display', 'none');
    $('#'+$(this).attr('divid')).css('display', 'flex');
    $('.stat_item').removeClass('active');
    $(this).addClass('active');
  });
});
