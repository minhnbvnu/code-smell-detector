function updateQuestionIndicator(count) {
  if(count == 0) {
    $('#questionsIndicator').hide();
  }
  else {
    $('#questionsIndicator').show();
    $('#questionsIndicator').text(count);
  }
}