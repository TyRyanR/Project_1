(function($) {

  $.fn.showAndHide = function() {
    $(this).hide().delay(500).fadeIn().delay(3000).fadeOut();
    return this;
  }

})(jQuery);
