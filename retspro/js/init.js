$(document).ready(function(){


    $('.button-collapse').sideNav(
    {
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens
    });
	
	$('.parallax').parallax();
	$('.materialboxed').materialbox();
	

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
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},800);
		return false;
	});


	$('.collapsible').collapsible({
    	accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });


	$('#animatedElement').click(function() {
		$(this).addClass("fadeIn");
	});

	$(document).ready(function(){
		$('.scrollspy').scrollSpy({scrollOffset:32});
	});


	var aniIconTimeout;

	$('.m4').hover(function(){
		aniIconResetAnimation($(this).children('h3'));
		aniIconResetTimeout();
	},function(){
		aniIconSetTimeout();
	});

	function aniIconRandom(){
		var items = $('.m4');
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






