function enableForm(element) {
  var submit = element.closest('form').find(':submit')
  submit.removeAttr("disabled");
  submit.addClass("dirty");

  // once a form is started, stop following the presenter
  activityIncomplete = true;
}