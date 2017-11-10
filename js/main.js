;(function () {
	
	'use strict';



	var isiPad = function(){
		return (navigator.platform.indexOf("iPad") != -1);
	};

	var isiPhone = function(){
	    return (
			(navigator.platform.indexOf("<i></i>Phone") != -1) || 
			(navigator.platform.indexOf("iPod") != -1)
	    );
	};

	var fullHeight = function() {
		if ( !isiPad() && !isiPhone() ) {
			$('.js-fullheight').css('height', $(window).height());
			$(window).resize(function(){
				$('.js-fullheight').css('height', $(window).height());
			})
		}
	};

	var sliderMain = function() {
		
	  	$('#bikes-home .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000
	  	});

	  	$('#bikes-home .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#bikes-home .flexslider .slides > li').css('height', $(window).height());	
	  	});

	  	$('.js-bikes-next').on('click', function(event){

	  		event.preventDefault();
	  		$('html, body').animate({
				scrollTop: $(this).closest('#bikes-home').next().offset().top
			}, 800, 'easeOutExpo');
	  		
	  	});

	};

	var sliderTestimony = function() {

		$('#bikes-testimony .flexslider').flexslider({
			animation: "slide",
			slideshowSpeed: 5000,
			directionNav: false,
			controlNav: true,
			smoothHeight: true,
			reverse: true
	  	});

	}

	var offcanvasMenu = function() {

		$('body').prepend('<div id="bikes-offcanvas" />');
		$('#bikes-offcanvas').append($('#bikes-main-nav').clone());

		setTimeout(function(){
			$('#bikes-offcanvas').prepend('<a href="#" class="js-bikes-offcanvas-close bikes-offcanvas-close" />');
			$('#bikes-offcanvas #bikes-main-nav').attr('id', '');
		}, 200);
		
	};

	var mainMenuSticky = function() {
		
		var sticky = $('.js-sticky');

		sticky.css('height', sticky.height());
		$(window).resize(function(){
			sticky.css('height', sticky.height());
		});

		var $section = $('.bikes-main-nav');
		
		$section.waypoint(function(direction) {
		  	
		  	if (direction === 'down') {

			    	$section.css({
			    		'position' : 'fixed',
			    		'top' : 0,
			    		'width' : '100%',
			    		'z-index' : 99999
			    	}).addClass('bikes-shadow');;

			}

		}, {
	  		offset: '0px'
		});

		$('.js-sticky').waypoint(function(direction) {
		  	if (direction === 'up') {
		    	$section.attr('style', '').removeClass('bikes-shadow');
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 69; }
		});

	};

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#bikes-offcanvas, .js-bikes-nav-toggle, .js-bikes-offcanvas-close");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {
	    	if ( $('body').hasClass('offcanvas-visible') ) {

	    		$('body').removeClass('bikes-overflow offcanvas-visible');

	    		$('.js-bikes-nav-toggle').removeClass('active');
	    	}
	    }
		});

		$('body').on('click', '.js-bikes-offcanvas-close', function(event){
			
			if ( $('body').hasClass('offcanvas-visible') ) {
	    		$('body').removeClass('bikes-overflow offcanvas-visible');
	    		$('.js-bikes-nav-toggle').removeClass('active');
	    	}

	    	event.preventDefault();

		});

	};
	
	var parallax = function() {

		$(window).stellar();

	};


	var redirectPage = function(url) {
		
		window.location = url;

	}

	var pageTransition = function() {

		$("body").css("display", "none");
		
		
		$("body").fadeIn(2000);
		
		$("a.transition").click(function(event){
		  	event.preventDefault();
		  	var linkLocation = this.href;

		  	$("body").fadeOut(2000, redirectPage);      
		  	
		  	redirectPage(linkLocation);
		});
			
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-bikes-nav-toggle', function(event){

			var $this = $(this);

			$('body').toggleClass('bikes-overflow offcanvas-visible');
			$this.toggleClass('active');
			event.preventDefault();

		});

	};

	var scrolledWindow = function() {

		$(window).scroll(function(){

			var header = $('#bikes-header'),
				scrlTop = $(this).scrollTop();

			if ( scrlTop > 500 && scrlTop <= 2000 ) {
				header.addClass('navbar-fixed-top bikes-animated slideInDown');
			} else if ( scrlTop <= 500) {
				if ( header.hasClass('navbar-fixed-top') ) {
					header.addClass('navbar-fixed-top bikes-animated slideOutUp');
					setTimeout(function(){
						header.removeClass('navbar-fixed-top bikes-animated slideInDown slideOutUp');
					}, 100 );
				}
			} 

		   $('#bikes-home .flexslider .bikes-overlay').css({
				'opacity' : (.5)+(scrlTop/2000)
		   });

		   if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-bikes-nav-toggle').removeClass('active');
		   }
		 
		});

		$(window).resize(function() {
			if ( $('body').hasClass('offcanvas-visible') ) {
		   	$('body').removeClass('offcanvas-visible');
		   	$('.js-bikes-nav-toggle').removeClass('active');
		   }
		});
		
	};


	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500);
			
			return false;
		});
	
	};


	var clickMenu = function() {
		var topVal = ( $(window).width() < 769 ) ? 0 : 58;

		$(window).resize(function(){
			topVal = ( $(window).width() < 769 ) ? 0 : 58;		
		});

		if ( $(this).attr('href') != "#") {
			$('#bikes-main-nav a:not([class="external"]), #bikes-offcanvas a:not([class="external"])').click(function(event){
				var section = $(this).data('nav-section');


				if ( $('div[data-section="' + section + '"]').length ) {

					$('html, body').animate({
			        	scrollTop: $('div[data-section="' + section + '"]').offset().top - topVal
			    	}, 500);	
			    	
			   }
			   event.preventDefault();

			});
		}

		


	};

	var navActive = function(section) {
		
		$('#bikes-main-nav li, #bikes-offcanvas li').removeClass('active');
		$('#bikes-main-nav, #bikes-offcanvas').find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		
	};

	var navigationSection = function() {

		var $section = $('div[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}

		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() + 155; }
		});

	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){
					
					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							el.addClass('fadeInUp animated');
							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );


	};


	$(function(){

		pageTransition();
		fullHeight();
		sliderMain();
		sliderTestimony();
		offcanvasMenu();
		mainMenuSticky();
		mobileMenuOutsideClick();
		parallax();
		burgerMenu();
		scrolledWindow();
		clickMenu();
		navigationSection();
		goToTop();
		
		contentWayPoint();
		
	});

}());



function initMap() {
        var chennai = {lat: 13.067439, lng: 80.237617};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: chennai
        });
        var marker = new google.maps.Marker({
          position: chennai,
          map: map
        });
}