$(function() {
  $(".button").click(function() {
		// validate and process form
		// first hide any error messages
    
		
	  var name = $("input#name").val();
		if (name == "") {
      $('#submit_btn').addClass('animated shake');
      $("input#name").focus();
      setTimeout(function(){
            $('#submit_btn').removeClass('animated shake');
      },1000);
      return false;
    }
		var email = $("input#email").val();
		if (email == "") {
      $('#submit_btn').addClass('animated shake');
      $("input#email").focus();
      setTimeout(function(){
            $('#submit_btn').removeClass('animated shake');
      },1000);
      return false;
    }
		var message = $("#message").val();
		if (message == "") {
      $('#submit_btn').addClass('animated shake');
      $("#message").focus();
      setTimeout(function(){
            $('#submit_btn').removeClass('animated shake');
      },1000);
      return false;
    }
		
		var dataString = 'name='+ name + '&email=' + email + '&message=' + message;
		//alert (dataString);return false;
		
		$.ajax({
      type: "POST",
      url: "contact.php",
      data: dataString,
      success: function() {
          $('#contact_form').find('input:text').val('');
          $('#contact_form').find('textarea').val('');
          $('#contact_form').find('input:submit').val('Sent! Thanks :D');
          $('#contact_form').find('input:submit').css('background-color','#8fc745');

          setTimeout(function(){
              $('#contact_form').find('input:submit').val('SEND');
              $('#contact_form').find('input:submit').css('background-color','rgba(0,0,0,0.2)');
          },2500);
          return false;
      }
     });
    return false;
	});
});

(function($) {
  // @todo Document this.
  $.extend($,{ placeholder: {
      browser_supported: function() {
        return this._supported !== undefined ?
          this._supported :
          ( this._supported = !!('placeholder' in $('<input type="text">')[0]) );
      },
      shim: function(opts) {
        var config = {
          color: '#888',
          cls: 'placeholder',
          selector: 'input[placeholder], textarea[placeholder]'
        };
        $.extend(config,opts);
        return !this.browser_supported() && $(config.selector)._placeholder_shim(config);
      }
  }});

  $.extend($.fn,{
    _placeholder_shim: function(config) {
      function calcPositionCss(target)
      {
        var op = $(target).offsetParent().offset();
        var ot = $(target).offset();

        return {
          top: ot.top - op.top,
          left: ot.left - op.left,
          width: $(target).width()
        };
      }
      function adjustToResizing(label) {
        var $target = label.data('target');
        if(typeof $target !== "undefined") {
          label.css(calcPositionCss($target));
          $(window).one("resize", function () { adjustToResizing(label); });
        }
      }
      return this.each(function() {
        var $this = $(this);

        if( $this.is(':visible') ) {

          if( $this.data('placeholder') ) {
            var $ol = $this.data('placeholder');
            $ol.css(calcPositionCss($this));
            return true;
          }

          var possible_line_height = {};
          if( !$this.is('textarea') && $this.css('height') != 'auto') {
            possible_line_height = { lineHeight: $this.css('height'), whiteSpace: 'nowrap' };
          }

          var ol = $('<label />')
            .text($this.attr('placeholder'))
            .addClass(config.cls)
            .css($.extend({
              position:'absolute',
              display: 'inline',
              float:'none',
              overflow:'hidden',
              textAlign: 'left',
              color: config.color,
              cursor: 'text',
              paddingTop: $this.css('padding-top'),
              paddingRight: $this.css('padding-right'),
              paddingBottom: $this.css('padding-bottom'),
              paddingLeft: $this.css('padding-left'),
              fontSize: $this.css('font-size'),
              fontFamily: $this.css('font-family'),
              fontStyle: $this.css('font-style'),
              fontWeight: $this.css('font-weight'),
              textTransform: $this.css('text-transform'),
              backgroundColor: 'transparent',
              zIndex: 99
            }, possible_line_height))
            .css(calcPositionCss(this))
            .attr('for', this.id)
            .data('target',$this)
            .click(function(){
              $(this).data('target').focus();
            })
            .insertBefore(this);
          $this
            .data('placeholder',ol)
            .focus(function(){
              ol.hide();
            }).blur(function() {
              ol[$this.val().length ? 'hide' : 'show']();
            }).triggerHandler('blur');
          $(window).one("resize", function () { adjustToResizing(ol); });
        }
      });
    }
  });
})(jQuery);

jQuery(document).add(window).bind('ready load', function() {
  if (jQuery.placeholder) {
    jQuery.placeholder.shim();
  }
});