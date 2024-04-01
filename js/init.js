$(document).ready(function(){
	$('[data-fancybox]').fancybox({
	});

	$(".phone").mask("+7 (999) 999-99-99");
	new WOW().init();

	$(" #owl-coach").owlCarousel({
		items:4,
		loop: true,
		navigation:false,
		pagination:false,
		autoplay:true,
		autoplayTimeout:1000,
		autoplayHoverPause:true,
		smartSpeed:800,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 3
			},
			960: {
				items: 4
			},
			1200: {
				items: 4
			}
		}
	});
	var owl = $('.owl-carousel');
	owl.owlCarousel({
		items:1,
		loop: true,
		nav: true,
		margin: 10,
		navSpeed: 1600,
		responsive: {
			0: {
				items: 1
			},
			600: {
				items: 1
			},
			960: {
				items: 1
			},
			1200: {
				items: 1
			}
		}

	});

//scroll to top
$('.button-up').click(function(){
	$('html, body').animate({ scrollTop: 0 }, 500);
	return false;
});

//show up-button
$(document).scroll(function(){
	var y = $(this).scrollTop();
	if (y > 800) {
		$('.button-up, .fixed-action-btn').fadeIn();
	} else {
		$('.button-up, .fixed-action-btn').fadeOut();
	}
});

$('.glitch').hover(function() {
	$(this).addClass('glitch');
}, function() {
	$(this).removeClass('glitch');
});



$('.parallax').parallax();
$('.button-collapse').sideNav(
{
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
  });

var vid = document.getElementById("bgvid");
function vidFade() {
	vid.classList.add("stopfade");
}

vid.addEventListener('ended', function(){
	vid.pause();
	vidFade();
});

$(window).scroll(function(){
	if ($(this).scrollTop() > 150) {
		$('.scrollToTop').fadeIn();
	} else {
		$('.scrollToTop').fadeOut();
	}
});


$('.scrollToTop').click(function(){
	$('html, body').animate({scrollTop : 0},900);
	return false;
});

$('#animatedElement').click(function() {
	$(this).addClass("fadeIn");
});

$(document).ready(function(){
	$('.scrollspy').scrollSpy({scrollOffset: 100});
});

var aniIconTimeout;

$('.m4, .ico1').hover(function(){
	aniIconResetAnimation($(this).children('h3'));
	aniIconResetTimeout();
},function(){
	aniIconSetTimeout();
});

function aniIconRandom(){
	var items = $('.m4, .ico1');
	var item = items[Math.floor(Math.random()*items.length)];
	aniIconResetAnimation($(item).children('h3'));
	aniIconSetTimeout();
}

function aniIconSetTimeout(){
	aniIconTimeout = setTimeout(aniIconRandom,Math.floor(Math.random()*3000+3000));
}

function aniIconResetTimeout(){
	clearTimeout(aniIconTimeout);
}

aniIconSetTimeout();

function aniIconResetAnimation(element){
	element.children('svg').removeClass('ani');
	var me = element.children('svg')[0];
	setTimeout(function() {
		element.children('svg').addClass('ani');
	}, 5);
}

});

$(".panel").click(function(){
	$(this).toggleClass('flip');
});

	// $(document).ready(function(){
	// 	$('.panel').hover(function(){
	// 		$(this).addClass('flip');
	// 	},function(){
	// 		$(this).removeClass('flip');
	// 	});
	// });

  document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });
  });
      