jQuery(document).ready( function($) {

	/*
		Click & Drag SVG
	 */
	var iniX, iniY, iniSvgX, iniSvgY;

	$('svg').mousedown( function(e) {
		iniX = e.pageX;
		iniY = e.pageY;
		iniSvgX = parseInt($('svg').css('left'));
		iniSvgY = parseInt($('svg').css('top'));

		$('svg').mousemove( function(e) {
			$('.center').fadeIn('fast');
			var dx = e.pageX - iniX;
			var dy = e.pageY - iniY;

			$('svg').css({
				'top': iniSvgY + dy,
				'left': iniSvgX + dx
			});
		});
	});

	$('svg').mouseup( function(e) {
		$('svg').unbind('mousemove');
	});

	$('.center').click( function() {
		$(window).trigger('resize');
		$('.center').fadeOut('fast');
	});

	/*
		Resize SVG
	 */

	$(window).resize( function() {
		var ww = $(window).width();
		var wh = $(window).height();

		if( ww > wh ) {
			$('svg').height( wh );
			$('svg').width( wh );
			$('svg').css({
				'top': 0,
				'left': (ww / 2) - ($('svg').width() / 2)
			});
		} else if( wh > ww ) {
			$('svg').height( ww );
			$('svg').width( ww );
			$('svg').css({
				'top': (wh / 2) - ($('svg').height() / 2),
				'left': 0
			});
		}
	});

	$(window).trigger('resize');

	/*
		Scaling Range Slider
	 */
	$('input[type="range"]').rangeslider({
		polyfill: false,
		onSlide: function(position, value) {
			var ww = $(window).width();
			var wh = $(window).height();
			value = value / 100;

			if( ww > wh ) {
				$('svg').width( (wh * value) + wh ).height( (wh * value) + wh );
			}

			if( wh > ww ) {
				$('svg').width( (ww * value) + ww ).height( (ww * value) + ww );
			}

			$('svg').css({
				'left': ($(window).width() / 2) - ($('svg').width() / 2),
				'top': ($(window).height() / 2) - ($('svg').height() / 2)
			});
		}
	});

	/*
		Visibility Toggles
	 */
	$('.visibility li').click( function() {
		var toggle = $(this).data('toggle');

		if( toggle === 'show' ) {
			$('svg g').fadeIn('slow');
			$('.visibility li:not(.active)').addClass('active');
			return;
		}

		if( toggle === 'hide' ) {
			$('svg g').fadeOut('slow');
			$('.visibility li.active').removeClass('active');
			return;
		}

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active');
			$('#'+toggle).fadeOut('slow');
		} else {
			$(this).addClass('active');
			$('#'+toggle).fadeIn('slow');
		}
	});

	// Show all shapes on load
	$('[data-toggle="show"]').trigger('click');

	/*
		Animation Toggles
	 */
	$('.animations li').click( function() {
		if( !$(this).hasClass('no-toggle') ) {
			$(this).hasClass('active') ? $(this).removeClass('active') : $(this).addClass('active');
		}

		switch( $(this).data('toggle') ) {
			case 'ring':
				if( $(this).hasClass('active') ) {
					$('.st1').attr('class', $('.st1').attr('class') + ' animated');
				} else {
					$('.st1').attr('class', $('.st1').attr('class').replace(' animated', '') );
				}
				break;
			case 'circlesOne':
				if( $(this).hasClass('active') ) {
					// $('#circles').velocity({
					// 	rotateZ: "360deg"
					// }, {
					// 	duration: 4000,
					// 	easing: "linear",
					// 	loop: true
					// });
					setInterval( function() {
						$('#circles circle').velocity({ r: "60" }, { duration: 800, easing: 'easeInOut' }).velocity({ r: "48" }, { duration: 800, easing: 'easeInOut' });
					}, 2000);
				} else {
					clearInterval();
					$('#circles').velocity("stop", true);
				}
				break;
			case 'circlesTwo':
				if( $(this).hasClass('active') ) {
					// $('#circlesTwo').velocity({
					// 	rotateZ: "360deg"
					// }, {
					// 	duration: 4000,
					// 	easing: "linear",
					// 	loop: true
					// });
					setInterval( function() {
						$('#circlesTwo circle').velocity({ r: "60" }, { duration: 800, easing: 'easeInOut' }).velocity({ r: "48" }, { duration: 800, easing: 'easeInOut' });
					}, 2000);
				} else {
					clearInterval();
					$('#circlesTwo').velocity("stop", true);
				}
				break;
			case 'thingOne':
				if( $(this).hasClass('active') ) {
					$('#thing1').velocity({
						rotateZ: "360deg"
					}, {
						duration: 4000,
						easing: "linear",
						loop: true
					});
				} else {
					$('#thing1').velocity("stop", true);
				}
				break;
			case 'thingTwo':
				if( $(this).hasClass('active') ) {
					$('#thing2').velocity({
						rotateZ: "-360deg"
					}, {
						duration: 4000,
						easing: "linear",
						loop: true
					});
				} else {
					$('#thing2').velocity("stop", true);
				}
				break;
			case 'stop':
				$('.animations li.active:not(.no-toggle)').trigger('click');
				break;
			case 'play':
				$('.animations li:not(.active):not(.no-toggle)').trigger('click');
				break;
			default:
				break;
		}
	});

	// function rotateClockwise (speed, $ele) {
	// 	if( !speed ) {
	// 		speed = 10000
	// 	}
	// 	$ele.animate({
	// 		-webkit-transform: rotate3d(0, 0, 1, 360deg);
	// 	    transform: rotate3d(0, 0, 1, 360deg);
	// 	}, speed);
	// }

	// function RotateOpacity() {
	// 	$('[class^="st"]:not(.st1):not(.st0)').removeAttr('style');
	// 	$('.st' + getRandomInt(2, 22)).css({
	// 		opacity: Math.random()
	// 	});
	// }

	/*
		Rotating BG Colors
	 */
	function RotateColors() {
		var colors = ( '#FF1D25', '#7AC943', '#FF931E', '#3FA9F5' );

		$('#BG rect').each( function(index) {
			var fill = $(this).attr('style');
			if( fill === 'fill: #FF1D25;' || fill === 'fill: rgb(255, 29, 37);' ) {
				$(this).css({
					fill: '#7AC943'
				});
				return;
			}
			if( fill === 'fill: #7AC943;' || fill === 'fill: rgb(122, 201, 67);' ) {
				$(this).css({
					fill: '#FF931E'
				});
				return;
			}
			if( fill === 'fill: #FF931E;' || fill === 'fill: rgb(255, 147, 30);' ) {
				$(this).css({
					fill: '#3FA9F5'
				});
				return;
			}
			if( fill === 'fill: #3FA9F5;' || fill === 'fill: rgb(63, 169, 245);' ) {
				$(this).css({
					fill: '#FF1D25'
				});
				return;
			}
		});
	}

	// setInterval(RotateColors, 2000);

	/*
		Get Random Int Between Range
	 */
	function getRandomInt(min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
});