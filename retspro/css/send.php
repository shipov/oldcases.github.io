<?php
 /* Здесь проверяется существование переменных */
  if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
 if (isset($_POST['name'])) {$name = $_POST['name'];}
  if (isset($_POST['email'])) {$email = $_POST['email'];}


/* Сюда впишите свою эл. почту */
 $address = "mihail.korablev@gmail.com";

/* А здесь прописывается текст сообщения, \n - перенос строки */
 $mes = "\nкоммент: $phone\nимя: $name\ne-mail: $email";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub='shipov.me'; //сабж
$email='comment <comment>'; // от кого
 $send = mail ($address,$sub,$mes,"Content-type:text/plain; charset = utf-8\r\nFrom:$email");

ini_set('short_open_tag', 'On');
header('Refresh: 3; URL=http://shipov.me');
?>

<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
<title>shipov.me</title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no">
<meta name="description" content="shipov.me - portfolio" />
<meta name="keywords" content="портфолио дизайнера, портфолио веб дизайнера, сайт дизайнера, веб дизайнер, веб дизайн, сайт веб дизайнера" />
<meta name="google-site-verification" content="IS6iEjM0VgK5_f7aXyseXOnVUnBuzjpgu42uhz6cFv4" />
<meta name='yandex-verification' content='7a9c0a367df1008e' />
<link rel="shortcut icon" href="http://shipov.me/images/favicon.png" >
 </link><link rel="icon" type="image/png" href="http://shipov.me/images/favicon.png" >
 </link>

<!-- CSS  -->
<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900&subset=cyrillic" rel="stylesheet">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
<link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
<link rel="stylesheet" type="text/css" href="css/lightbox.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="css/animation.css">
<link rel="stylesheet" href="css/jquery.skidder.css">

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  ga('create', 'UA-29327070-21', 'auto');
  ga('send', 'pageview');
</script>
</head>
<body>
<style type="text/css">
  .body {
    background: url(jpg/fallout.jpg) 100% 100% no-repeat;
    background-size: cover; 
  }
</style>
<div class="container center">
<!-- Modal Trigger -->

   <div class="row" style="margin-top:32%;">
      <div class="col s12 m4 l2"><p></p></div>
      <div class="col s12 m4 l8">
        <h4>ваше сообщение<mark> отправлено</mark></h4>
        <p>свяжусь с вами в ближайшее время...</p>
      </div>
      <div class="col s12 m4 l2"><p></p></div>
    </div>
</div>



 <!--  Scripts-->
 <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
 <script src="js/materialize.js"></script>
 <script src="js/init.js"></script>
 <script src="js/jquery.nicescroll.js"></script>
 <script src="js/lightbox.js"></script>
 <script>

   $(function(){

   //scroll to top
   $('.button-up').click(function(){
     $('html, body').animate({ scrollTop: 0 }, 500);
     return false;
   });

 //show up-button
 $(document).scroll(function(){
   var y = $(this).scrollTop();
   if (y > 800) {
     $('.button-up').fadeIn();
   } else {
     $('.button-up').fadeOut();
   }
 });

 });
 </script>
 <script>particlesJS("particles-js", {
     "particles": {
         "number": {
             "value": 100,
             "density": {
                 "enable": true,
                 "value_area": 900
             }
         },
         "color": {
             "value": "#ffffff"
         },
         "shape": {
             "type": "circle",
             "stroke": {
                 "width": 0,
                 "color": "#000000"
             },
             "polygon": {
                 "nb_sides": 5
             },
             "image": {
                 "src": "img/github.svg",
                 "width": 100,
                 "height": 100
             }
         },
         "opacity": {
             "value": 0.5,
             "random": false,
             "anim": {
                 "enable": false,
                 "speed": 1,
                 "opacity_min": 0.1,
                 "sync": false
             }
         },
         "size": {
             "value": 3,
             "random": true,
             "anim": {
                 "enable": false,
                 "speed": 40,
                 "size_min": 0.1,
                 "sync": false
             }
         },
         "line_linked": {
             "enable": true,
             "distance": 150,
             "color": "#ffffff",
             "opacity": 0.4,
             "width": 1
         },
         "move": {
             "enable": true,
             "speed": 6,
             "direction": "none",
             "random": false,
             "straight": false,
             "out_mode": "out",
             "bounce": false,
             "attract": {
                 "enable": false,
                 "rotateX": 600,
                 "rotateY": 1200
             }
         }
     },
     "interactivity": {
         "detect_on": "canvas",
         "events": {
             "onhover": {
                 "enable": true,
                 "mode": "repulse"
             },
             "onclick": {
                 "enable": true,
                 "mode": "push"
             },
             "resize": true
         },
         "modes": {
             "grab": {
                 "distance": 300,
                 "line_linked": {
                     "opacity": 1
                 }
             },
             "bubble": {
                 "distance": 300,
                 "size": 40,
                 "duration": 2,
                 "opacity": 8,
                 "speed": 2
             },
             "repulse": {
                 "distance": 100,
                 "duration": 0.4
             },
             "push": {
                 "particles_nb": 4
             },
             "remove": {
                 "particles_nb": 2
             }
         }
     },
     "retina_detect": true
 });
 /*var count_particles, stats, update;
 stats = new Stats;
 stats.setMode(0);
 stats.domElement.style.position = 'absolute';
 stats.domElement.style.left = '0px';
 stats.domElement.style.top = '0px';
 document.body.appendChild(stats.domElement);
 count_particles = document.querySelector('.js-count-particles');
 update = function() {
     stats.begin();
     stats.end();
     if (window.pJSDom[0].pJS.particles && window.pJSDom[0].pJS.particles.array) {
         count_particles.innerText = window.pJSDom[0].pJS.particles.array.length;
     }
     requestAnimationFrame(update);
 };
 requestAnimationFrame(update);;*/</script>
 <script>
     $('#animatedElement').click(function() {
         $(this).addClass("fadeIn");
     });
       $(document).ready(function(){
     $('.scrollspy').scrollSpy();
   });

 </script


   <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
   <script src="./lib/imagesloaded.js"></script>
   <script src="./lib/smartresize.js"></script>
   <script src="../src/jquery.skidder.js"></script>

   <script>
     $('.slideshow').each( function() {
       var $slideshow = $(this);
       $slideshow.imagesLoaded( function() {
         $slideshow.skidder({
           slideClass    : '.slide',
           animationType : 'css',
           scaleSlides   : true,
           maxWidth : 1300,
           maxHeight: 500,
           paging        : true,
           autoPaging    : true,
           pagingWrapper : ".skidder-pager",
           pagingElement : ".skidder-pager-dot",
           swiping       : true,
           leftaligned   : false,
           cycle         : true,
           jumpback      : false,
           speed         : 400,
           autoplay      : false,
           autoplayResume: false,
           interval      : 4000,
           transition    : "slide",
           afterSliding  : function() {},
           afterInit     : function() {}
         });
       });
     });

     // $('.slideshow-nocycle').each( function() {
     //   var $slideshow = $(this);
     //   $slideshow.imagesLoaded( function() {
     //     $slideshow.skidder({
     //       slideClass    : '.slide',
     //       scaleSlides   : true,
     //       maxWidth : 1300,
     //       maxHeight: 500,
     //       leftaligned   : true,
     //       cycle         : false,
     //       paging        : true,
     //       swiping       : true,
     //       jumpback      : false,
     //       speed         : 400,
     //       autoplay      : false,
     //       interval      : 4000,
     //       afterSliding  : function() {}
     //     });
     //   });
     // });

     $(window).smartresize(function(){
       $('.slideshow').skidder('resize');
     });

   </script>
 <!-- Yandex.Metrika counter --> <script type="text/javascript"> (function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter37782405 = new Ya.Metrika({ id:37782405, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true, ut:"noindex" }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks"); </script> <!-- /Yandex.Metrika counter -->
 </body>
 </html>
