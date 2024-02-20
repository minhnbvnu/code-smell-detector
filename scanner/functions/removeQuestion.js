function removeQuestion(questionID) {
  var question = $("li#"+questionID);
  question.toggleClass('answered')
          .remove();
  $('#answered').append($(question));
  updateQuestionIndicator();

  if($('#unanswered li').length == 0) {
    unpinSidebar('question');
  }
}