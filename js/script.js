/**
 * Main JS file for Persona behaviours
 */

(function ($) {
  $(document).ready(function(){

    /* # Make videos responsive. */
    $('.post').fitVids();

    /* Make specific links open in a new window in a HTML5 valid way */
    $('a[rel*="external"]').click(function(){
      $(this).attr('target', '_blank');
    })

    $(".arctic_scroll").arctic_scroll({
      speed: 1000
    });
  });
}(jQuery));

// Arctic Scroll by Paul Adam Davis
// https://github.com/PaulAdamDavis/Arctic-Scroll
(function ($) {
$.fn.arctic_scroll = function (options) {
    var defaults = {
      elem: $(this),
      speed: 500
    };

    var options = $.extend(defaults, options);

    options.elem.on('touchstart click', function(event){
      event.preventDefault();

      var offset = ($(this).attr('data-offset')) ? $(this).attr('data-offset') : false,
        position = ($(this).attr('data-position')) ? $(this).attr('data-position') : false;

        if (offset) {
          var toMove = parseInt(offset);
          $('html,body').stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, options.speed);
        } else if (position) {
          var toMove = parseInt(position);
          $('html,body').stop(true, false).animate({scrollTop: toMove }, options.speed);
        } else {
          $('html,body').stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, options.speed);
        }
    });
  };
})(jQuery);
