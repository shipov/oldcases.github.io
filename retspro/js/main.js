 $(document).ready(function() {
 	$('#message-form, #feedback-form').submit(function(e) {
 		e.preventDefault();

 		var form = this;

 		var data = {
 			name: $('#name').val().trim(),
 			phone: $('#phone').val().trim(),
 			body: $('#body').val().trim()
 		};

 		if ($(this).prop('id') == 'message-form') {
 			data.email =  $('#email').val().trim();
 			data.subject = $('#subject').val().trim();
 		}

 		$.ajax({
 			url: 'send.php',
 			method: 'POST',
 			dataType: 'json',
 			data: data,
 			success: function(resp) {
 				if (resp.result) {
 					$.notify({

 						icon: "images/marker.png",
 						message: 'Ваше сообщение успешно отправлено' 
 					}, 					
 					{
 						icon_type: 'image',
 						type: 'success',
 						placement: {
 							from: "top",
 							align: "center"
 						},
 						delay: 2000,
 						allow_dismiss: false				
 					});

 					form.reset();
 					$('.open2').click();
 				} else {
 					$.notify({
 						message: 'Ошибка: ' + resp.error 
 					},
 					{
 						type: 'danger',
 						placement: {
 							from: "top",
 							align: "center"
 						},
 						delay: 2000,
 						allow_dismiss: false					
 					});				
 				}
 			}
 		});

 	});



 	$("body")[0].style.opacity=1;
 	$("a.transition").on("click",function(event){
 		console.log("кликнул");
 		linkLocation = this.href;
 		$("body")[0].style.opacity=0;
 		event.preventDefault();
 		setTimeout(redirectPage,800);
 	});
 	function redirectPage() {
 		window.location = linkLocation;
 	}
 });
 $(document).ready(function() {
// show hide header elements
const HeaderTop = 400;
$(window).scroll(function(){
	console.log ("$(window).scrollTop() > (HeaderTop-107)    =  " + $(window).scrollTop() + ">" +  (HeaderTop-107));
	if( $(window).scrollTop() > (HeaderTop-107)  ) {
		$('.menu').addClass('big');

		$('#my_nav').css({position: 'fixed', top: '-107px'});
	} 
	else {
		$('.menu').removeClass('big');

		$('#my_nav').css({position: 'fixed', top: '0px'});
		console.log ($(window).scrollTop());
	}
});
// Карусель товаров
$("#owl-coach").owlCarousel({
	items:3,
	loop: true,
	autoWidth:true,
	navigation:true,
	pagination:true,
	autoPlay:4000
});
$("#owl-coach2").owlCarousel({
	items:3,
	loop: true,
	autoWidth:true,
	navigation:true,
	pagination:true,
	autoPlay:2000
});
$("#owl-coach3").owlCarousel({
	items:5,
	loop: true,
	autoWidth:true,
	navigation:false,
	pagination:false,
	autoPlay:1000
});
var scene = document.getElementById('scene');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene2');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene3');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene4');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene5');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene6');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene7');
var parallax = new Parallax(scene);

var scene = document.getElementById('scene8');
var parallax = new Parallax(scene);

new WOW().init();

///smooth scroll
$("#right_nav").on("click","a", function (event) {		
	event.preventDefault();
	var id  = $(this).attr('href'),
	top = $(id).offset().top-100;
	$('body,html').animate({scrollTop: top}, 1000);
});
///active

$(".open").click(function(){
	$("#slideBox").slideToggle("fast");
});
$(".open2").click(function(){
	$("#slideBox2").slideToggle("fast");
});
$(".open3").click(function(){
	$("#slideBox3").slideToggle("fast");
});
$(".open4").click(function(){
	$("#slideBox4").slideToggle("fast");
});
$(".open5").click(function(){
	$("#slideBox5").slideToggle("fast");
});
$(".open6").click(function(){
	$("#slideBox6").slideToggle("fast");
});

	$(window).scroll(function(){
		if ($(this).scrollTop() > 250) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});


});
 var map;
 function initMap() {
 	map = new google.maps.Map(document.getElementById('map'), {
 		center: {lat: 55.735183, lng: 37.555852}, 
 		zoom: 13,
 		styles: [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}]

 	});
 	marker = new google.maps.Marker({
 		map: map,
 		draggable:false,
 		title: 'RetsPro - энергосберегающая технология',
 		icon: 'images/marker.png',
 		animation: google.maps.Animation.DROP,
 		position: {lat: 55.735183, lng: 37.555852}
 	});
 	marker.addListener('click', toggleBounce);
 }

 function toggleBounce() {
 	if (marker.getAnimation() !== null) {
 		marker.setAnimation(null);
 	} else {
 		marker.setAnimation(google.maps.Animation.BOUNCE);
 	}
 	var contentString = '<div id="content">'+
 	'<div id="siteNotice">'+
 	'</div>'+
 	'<h1 id="firstHeading" class="firstHeading"><span class="orange">R</span>ets<span class="orange">P</span>ro</h1>'+
 	'<div id="bodyContent">'+
 	'<p>121059, Россия, Москва, Бережковская набережная, д. 20, стр. 5, офис 414'+
 	'<br>'+
 	'телефон: <b>+7 929 683 5570</b>'+
 	'<p><b>Веб-сайт:</b> <a href="http://www.retspro.ru/" target="_blank">retspro.ru</a>'+
 	'</p>'+
 	'</div>'+
 	'</div>';
 	var infowindow = new google.maps.InfoWindow({
 		content: contentString,
 		maxWidth: 400,
 		maxHeight:200
 	});
 	marker.addListener('click', function() {
 		infowindow.open(map, marker);
 	});
 }

