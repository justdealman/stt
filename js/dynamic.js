function footerList() {
	if ( window.innerWidth >= 1300 ) {
		var cols = 4;
	}
	else {
		var cols = 3;
	}
	var elements = $('footer .list .temp p').size();
	$('footer .list ul').remove();
	$('footer .list').append('<ul></ul>');
	for ( var i = 1; i <= cols; i++ ) {
		$('footer .list ul').append('<li></li>');
		for ( var j = 1; j <= Math.ceil(elements/cols); j++ ) {
			$('footer .list .temp p:nth-of-type('+eval((i-1)*Math.ceil(elements/cols)+j)+')').clone().appendTo($('footer .list ul li:nth-of-type('+i+')'));
		}
	}
	$('div.clear').css({
		'height': $('footer').outerHeight()+'px'
	});
	$('footer').css({
		'margin-top': -$('footer').outerHeight()+'px'
	});
	$('.gallery .preview img').bind('click', function() {
		$(this).parents('.gallery').find('.big img[data-big="'+$(this).attr('data-preview')+'"]').show().siblings().hide();
		$(this).addClass('active').siblings().removeClass('active');
	}).filter(':first').click();
}
function gridUl() {
	if ( window.innerWidth >= 1300 ) {
		var cols = 4;
	}
	else {
		var cols = 3;
	}
	$('.grid ul li').outerHeight('auto');
	var elements = $('.grid ul li').size();
	for ( var i = 0; i < Math.ceil(elements/cols); i++ ) {
		var max = 0;
		for ( var j = 1; j <= cols; j++ ) {
			$('.grid ul li:nth-child('+eval(i*cols+j)+')').each(function() {
				var h = $(this).outerHeight(); 
				max = h > max ? h : max;
			});
		}
		for ( var j = 1; j <= cols; j++ ) {
			$('.grid ul li:nth-child('+eval(i*cols+j)+')').outerHeight(max);
		}
	}
}
$(document).ready(function() {
	$('.search input').bind('focusin', function() {
		$(this).parents('.search').addClass('focused');
	});
	$('.search input').bind('focusout', function() {
		$(this).parents('.search').removeClass('focused');
	});
	$('header .menu > li.sub').hover(
		function() {
			$(this).find('ul').stop(true,true).delay(100).slideDown(200);
		},
		function() {
			$(this).find('ul').stop(true,true).delay(100).slideUp(200);
		}
	);
	if ( $('.clients .carousel').length > 0 ) {
		$('.clients .carousel').jcarousel({
			scroll: 1,
			animation: 500,
			wrap: 'circular'
		});
		$('.team .carousel').bind('swipeleft', function() {
			$('.team .carousel .jcarousel-next').trigger('click');
		});
		$('.team .carousel').bind('swiperight', function() {
			$('.team .carousel .jcarousel-prev').trigger('click');
		});
	}
	footerList();
	$('input, textarea').each(function () {
		$(this).data('holder',$(this).attr('placeholder'));
		$(this).focusin(function(){
			$(this).attr('placeholder','');
		});
		$(this).focusout(function(){
			$(this).attr('placeholder',$(this).data('holder'));
		});
	});
	if ( $('.grid').length > 0 ) {
		$('.grid .card').append('<span class="close"></span>');
		$('.grid [data-card]').bind('click', function() {
			var target = $(this).attr('data-card');
			$('.grid ul li, .grid .list1 > div, .grid .list2 > div').css({
				'margin-bottom': '20px'
			}, 200);
			$('.grid .card').hide();
			$(this).css({
				'margin-bottom': $('.grid .card[data-element="'+target+'"]').outerHeight()+40+'px'
			});
			$('.grid .card[data-element="'+target+'"]').css({
				'top': $(this).position().top+$(this).outerHeight()+20+'px'
			}).show();
			$('html, body').animate({
				scrollTop: $('.grid .card[data-element="'+target+'"]').offset().top-($(window).height()-$('.grid .card[data-element="'+target+'"]').outerHeight())/2+'px'
			}, 0);
		});
		$('.grid .card .close').bind('click', function() {
			$(this).parent().hide();
			$(this).parents('.grid').children('ul').find('li').css({
				'margin-bottom': '20px'
			});
		});
	}
	if ( $('.grid ul').length > 0 ) {
		gridUl();
	}
	$(window).bind('scroll', function() {
		if ( $(document).scrollTop() >= 68 ) {
			$('header').addClass('fixed');
			$('.wrapper').css({
				'padding-top': '118px'
			});
		}
		else {
			$('header').removeClass('fixed');
			$('.wrapper').css({
				'padding-top': '0'
			});
		}
	});
	if ( $('.filter').length > 0 ) {
		$('.title .filter > ul > li > div').each(function() {
			var c = $(this);
			c.find('h6.min').text(eval(c.attr('data-min')));
			c.find('h6.max').text(eval(c.attr('data-max')));
			c.find('input.from').val(eval(c.attr('data-from')));
			c.find('input.to').val(eval(c.attr('data-to')));
			c.find('.range-slider > div').slider({
				range: true,
				min: eval(c.attr('data-min')),
				max: eval(c.attr('data-max')),
				step: eval(c.attr('data-step')),
				values: [ eval(c.attr('data-from')), eval(c.attr('data-to')) ],
				slide: function(event, ui) {
					c.find('input.from').val(ui.values[0]);
					c.find('input.to').val(ui.values[1]);
				}
			});
			c.find('input.from').change(function() {
				if ( $(this).val() <= c.find('.range-slider > div').slider('option', 'min') ) {
					$(this).val(c.find('.range-slider > div').slider('option', 'min'));
				}
				if ( $(this).val() >= c.find('.range-slider > div').slider('values', 1) ) {
					$(this).val(c.find('.range-slider > div').slider('values', 1));
				}
				c.find('.range-slider > div').slider('values', 0, $(this).val());
			});
			c.find('input.to').change(function() {
				if ( $(this).val() >= c.find('.range-slider > div').slider('option', 'max') ) {
					$(this).val(c.find('.range-slider > div').slider('option', 'max'));
				}
				if ( $(this).val() <= c.find('.range-slider > div').slider('values', 0) ) {
					$(this).val(c.find('.range-slider > div').slider('values', 0));
				}
				c.find('.range-slider > div').slider('values', 1, $(this).val());
			});
		})
		$('.title .filter > ul > li > span').bind('click', function() {
			if ( $('.title .filter > ul > li.active').length > 0 ) {	
				$('.title .filter > ul > li').removeClass('active');
			}
			if ( $(this).parent('.active').length > 0 ) {
				$(this).parent().removeClass('active');
			}
			else {
				$(this).parent().addClass('active');
			}
		});
		$('html').click(function() {
			$('.title .filter > ul > li').removeClass('active');
		});
		$('.title .filter > ul > li > span, .title .filter > ul > li > div').click(function(event){
			event.stopPropagation();
		});
		$('.title .sort .view ul li').bind('click', function() {
			$(this).addClass('active').siblings().removeClass('active');
		}).filter(':first').click();
		$('.title .sort .order ul li').bind('click', function() {
			$(this).addClass('active').siblings().removeClass();
			if ( !$(this).hasClass('down') && !$(this).hasClass('up') ) {
				$(this).addClass('down');
			}
			else {
				if ( $(this).hasClass('down') ) {
					$(this).addClass('up').removeClass('down');
				}
				else {
					$(this).addClass('down').removeClass('up');
				}
			}
		}).filter(':first').click();
	}
	$('.phone.hidden p span').bind('click', function(event) {
		var target = $(this).parents('.phone').find('h5');
		target.text(target.attr('data-phone'));
		event.stopPropagation();
	})
});
$(window).resize(function() {
	footerList();
	if ( $('.grid ul').length > 0 ) {
		gridUl();
	}
});