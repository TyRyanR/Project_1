(function($) {

  $.fn.showAndHide = function() {
    var self = $(this);
    self.fadeIn(); // because fadeout sets display to none so make sure each item is fading in from the item before it.
    var timeOutID = setTimeout(function() {  //setTimeout returns a number ID so you can use it in the clearTimeout call
      self.fadeOut()
    }, 1000);

    return timeOutID
  }

})(jQuery);
