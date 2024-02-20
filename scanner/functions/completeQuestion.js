function completeQuestion(questionID) {
  var question = $("li#"+questionID)
  if(question.length > 0) {
    question.addClass('closed');
    feedbackActivity();
  }
}