function feedback_response(elem, response) {
    var originalText = $(elem).text();
    $(elem).text(response);
    window.setTimeout(function() {
      $(elem).parent().hide();
      closeMenu();
      $(elem).text(originalText);
    }, 1000);
  }