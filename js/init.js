$(document).ready(function(){

	/* INIT SLIDE HEADER */

	$(function(){
	var slides = $('#slides');
	slides.slidesjs({
	    width: 2000,
	    height: 2000,
	    play: {
			auto: true,
			interval: 13000
		},
		effect: {
	      slide: {
	        speed: 1000
	          // [number] Speed in milliseconds of the slide animation.
	      }
	    }
	  });
	});


	/* ANIMATION OF DISCOVER */

	var textheadercontain = $('.text_header_contain');
	var discover = $('#discover');
	  textheadercontain.addClass('animated bounceInRight');
	  discover.addClass('animated fadeInUpBig');
	 setTimeout(function(){
	  discover.removeClass('animated fadeInUpBig');
	},2000);

	/* COLOR SWITCHER */

	var linkcolorswitcher = $("link.color_switcher"); 
	if($.cookie("css")) {
		linkcolorswitcher.attr("href",$.cookie("css"));
	}
	$("#color_choice li a").click(function() { 
		linkcolorswitcher.attr("href",$(this).attr('rel'));
		$.cookie("css",$(this).attr('rel'), {expires: 1, path: '/'});
		return false;
	});

	/* PHOTOS SLIDE */

	var flexslider = $('.flexslider');
	flexslider.flexslider({
		animation: "fade",
		startAt: 0, 
		controlNav: false,               
		directionNav: true,             
		prevText: "<img src='images/arrow-slide_prev.png'>",           
		nextText: "<img src='images/arrow-slide_next.png'>",
		animationLoop: true,
		animationSpeed: 1500,
	});

	/* ANIMATION SERVICES */

	var allevent = $('.all_event');
	allevent.mouseenter(function(){
		$(this).animate({top: '-20'}, 250, function(){

		});
	}),
	allevent.mouseleave(function(){
		$(this).animate({top: '0'}, 250, function(){

		});
	});

	/* THE THEME */

	var displaybook2 = $('#display_book_2');
	var displaybook3 = $('#display_book_3');
	var bookpartcontent = $('#book_part_content');
	displaybook2.click(function(){
		displaybook3.removeClass('current_display');
		displaybook2.addClass('current_display');
		bookpartcontent.removeClass('cols3');
		bookpartcontent.addClass('cols2');
	}),
	displaybook3.click(function(){
		displaybook2.removeClass('current_display');
		displaybook3.addClass('current_display');
		bookpartcontent.removeClass('cols2');
		bookpartcontent.addClass('cols3');
	});	

	/* BUTTONS WORK */

	var displaysponsors2 = $('#display_sponsors_2');
	var displaysponsors4 = $('#display_sponsors_4');
	var rbgridli = $('.rb-grid li');
	var superboxlist = $('.superbox-list');
	displaysponsors2.click(function(){
		displaysponsors4.removeClass('current_display_sponsors');
		displaysponsors2.addClass('current_display_sponsors');
		rbgridli.addClass('rb-span-2');
		superboxlist.addClass('dis-2');
	}),
	displaysponsors4.click(function(){
		displaysponsors2.removeClass('current_display_sponsors');
		displaysponsors4.addClass('current_display_sponsors');
		rbgridli.removeClass('rb-span-2');
		superboxlist.removeClass('dis-2');
	});
	var overlayeffect = $('#overlay_effect');
	var expandingeffect = $('#expanding_effect');
	var superbox = $('.superbox');
	var rbgrid = $('#rb-grid');
	overlayeffect.click(function(){
		expandingeffect.removeClass('current_effect_sponsors');
		overlayeffect.addClass('current_effect_sponsors');
		superbox.css('display','none');
		rbgrid.css('display','block');
	}),
	expandingeffect.click(function(){
		overlayeffect.removeClass('current_effect_sponsors');
		expandingeffect.addClass('current_effect_sponsors');
		rbgrid.css('display','none');
		superbox.css('display','inline-block');
	})

	/* READ MORE */

	var showText='READ MORE';
	var hideText='READ LESS';
	var is_visible = false;
	 
	var more = $('.more');
	more.next().append('<div class="read_more"><a href="#" class="toggleLink">'+showText+'</a></div>');
	 
	more.hide();
	 
	$('a.toggleLink').click(function() {
		is_visible = !is_visible;
		$(this).html( (!is_visible) ? showText : hideText);
		$(this).parent().parent().prev('.more').slideToggle('slow');

		return false;
	});
		 
	/* NUMBER OF FACEBOOK FANS */
	$.ajax({
	    url: 'https://graph.facebook.com/bradaylex',
	    dataType: 'jsonp',
	    success: function(data) {
	        $('#fans').html(data.likes);
	   }
	});

	/* NUMBER OF FOLLOWERS TWITTER */
    $.ajax({
        url: 'http://api.twitter.com/1/users/show.json',
        data: {screen_name: 'bradaylex'},
        dataType: 'jsonp',
        success: function(data) {
            $('#followers').html(data.followers_count);
       }
    });

    /* LAST TWEETS */
	getTwitters('tweet', { 
	  id: 'bradaylex', 
	  count: 2, 
	  enableLinks: true, 
	  ignoreReplies: true, 
	  clearContents: true,
	  template: '<p>"%text%" <a href="http://twitter.com/%user_screen_name%/statuses/%id%/">%time%</a></p>'
	});
});

/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {

	var pluses = /\+/g;

	function raw(s) {
		return s;
	}

	function decoded(s) {
		return decodeURIComponent(s.replace(pluses, ' '));
	}

	function converted(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			return config.json ? JSON.parse(s) : s;
		} catch(er) {}
	}

	var config = $.cookie = function (key, value, options) {

		// write
		if (value !== undefined) {
			options = $.extend({}, config.defaults, options);

			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}

			value = config.json ? JSON.stringify(value) : String(value);

			return (document.cookie = [
				config.raw ? key : encodeURIComponent(key),
				'=',
				config.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}

		// read
		var decode = config.raw ? raw : decoded;
		var cookies = document.cookie.split('; ');
		var result = key ? undefined : {};
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = decode(parts.join('='));

			if (key && key === name) {
				result = converted(cookie);
				break;
			}

			if (!key) {
				result[name] = converted(cookie);
			}
		}

		return result;
	};

	config.defaults = {};

	$.removeCookie = function (key, options) {
		if ($.cookie(key) !== undefined) {
			// Must not alter options, thus extending a fresh object...
			$.cookie(key, '', $.extend({}, options, { expires: -1 }));
			return true;
		}
		return false;
	};

}));

/* LIKES */

$(document).ready(function(){

 function reloadEvents(){
  $('a[data-remote="true"]').off('click');
  $('a[data-delete-remote="true"]').off('click');

     $('a[data-remote="true"]').on('click', function(e){
         e.preventDefault();
         
         $.ajax({
             url: $(this).attr('href'),
             context: this
         }).done(function(){
             var div = $(this).find('div.likes')
             div.addClass('red');
              var count = parseInt(div.text()) + 1;
              div.html('<p>' + count +'</p>');

              $(this).removeAttr('data-remote');
              $(this).attr('data-delete-remote', true);
     reloadEvents();
         });
     });

     $('a[data-delete-remote="true"]').on('click', function(e){
         e.preventDefault();

         $.ajax({
             url: $(this).attr('href'),
             context: this
         }).done(function(){
             var div = $(this).find('div.likes')
             div.removeClass('red');
             var count = parseInt(div.text()) - 1;
             div.html('<p>' + count +'</p>');

             $(this).removeAttr('data-delete-remote');
             $(this).attr('data-remote', true);
     reloadEvents();
         });
     }); 
 }

 reloadEvents();

});