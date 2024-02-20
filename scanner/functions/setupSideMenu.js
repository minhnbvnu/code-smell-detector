function setupSideMenu() {
  $("#hamburger").click(function() {
    openMenu();
  });

  $("#navToggle").click(function() {
    $("#navigation").toggle();
    updateMenuChevrons();
  });

  $('#fileDownloads').click(function() {
    closeMenu();
    window.open('download');
  })

  $("#paceSlower").click(function() {
    sendPace('slower');
  });

  $("#paceFaster").click(function() {
    sendPace('faster');
  });

  $('#questionToggle').click(function() {
    if ( ! $(this).hasClass('disabled') ) {
      $('#questionSubmenu').toggle();
    }
  });
  $("#askQuestion").click(function() {
    if ( ! $(this).hasClass('disabled') ) {
      var question = $("#question").val()
      var qid = askQuestion(question);

      feedback_response(this, I18n.t('menu.sending'));
      $("#question").val('');

      var questionItem = $('<li/>').text(question).attr('id', qid);
      questionItem.click( function(e) {
        cancelQuestion($(this).attr('id'));
        $(this).remove();
      });
      $("#askedQuestions").append(questionItem);
    }
  });

  $('#feedbackToggle').click(function() {
    if ( ! $(this).hasClass('disabled') ) {
      $('#feedbackSubmenu').toggle();
    }
  });
  $("#sendFeedback").click(function() {
    if ( ! $(this).hasClass('disabled') ) {
      sendFeedback($( "input:radio[name=rating]:checked" ).val(), $("#feedback").val());
      feedback_response(this, "Sending...");
      $("#feedback").val('');
    }
  });

  $("#editSlide").click(function() {
    editSlide();
    closeMenu();
  });

  $('#clearAnnotations').click(function() {
    annotations.erase();
  });

  $('#closeMenu, #sidebarExit').click(function() {
    closeMenu();
  });

  function feedback_response(elem, response) {
    var originalText = $(elem).text();
    $(elem).text(response);
    window.setTimeout(function() {
      $(elem).parent().hide();
      closeMenu();
      $(elem).text(originalText);
    }, 1000);
  }
}