function postQuestion(question, questionID) {
  var questionItem = $('<li/>').text(question).attr('id', questionID);

  questionItem.click( function(e) {
      markCompleted($(this).attr('id'));
      removeQuestion(questionID);
    });

  $("#unanswered").append(questionItem);
  updateQuestionIndicator();

  // don't allow the sidebar to hid when questions exist
  pinSidebar('question');
}