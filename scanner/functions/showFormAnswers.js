function showFormAnswers(form) {
  // If we have any correct options, find the parent element, then tag all descendants as incorrect
  $('.slide.form\\='+form+' label.correct').parents('.form.element').find('label.response,option').addClass('incorrect');
  // Then remove the double tag from the correct answers.
  $('.slide.form\\='+form+' label.correct').removeClass('incorrect');
  // finally, style the slide so we can see the effects
  $('.slide.form\\='+form).addClass('answerkey')
}