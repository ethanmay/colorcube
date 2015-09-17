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
		var id = $(this).data('toggle');

		if( id === 'show' ) {
			$('svg g').fadeIn('slow');
			$('.visibility li:not(.active)').addClass('active');
			return;
		}

		if( id === 'hide' ) {
			$('svg g').fadeOut('slow');
			$('.visibility li.active').removeClass('active');
			return;
		}

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active');
			$('#'+id).fadeOut('slow');
		} else {
			$(this).addClass('active');
			$('#'+id).fadeIn('slow');
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
					$('#circles').attr('class', $('#circles').attr('class') + ' animated');
				} else {
					$('#circles').attr('class', $('#circles').attr('class').replace(' animated', '') );
				}
				break;
			case 'circlesTwo':
				if( $(this).hasClass('active') ) {
					$('#circlesTwo').attr('class', $('#circlesTwo').attr('class') + ' animated');
				} else {
					$('#circlesTwo').attr('class', $('#circlesTwo').attr('class').replace(' animated', '') );
				}
				break;
			case 'thingOne':
				if( $(this).hasClass('active') ) {
					$('#thing1').attr('class', $('#thing1').attr('class') + ' animated');
				} else {
					$('#thing1').attr('class', $('#thing1').attr('class').replace(' animated', '') );
				}
				break;
			case 'thingTwo':
				if( $(this).hasClass('active') ) {
					$('#thing2').attr('class', $('#thing2').attr('class') + ' animated');
				} else {
					$('#thing2').attr('class', $('#thing2').attr('class').replace(' animated', '') );
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