function renderFormWatcher(element) {
  var form = element.attr('title');
  var action = $('.content form#'+form).attr('action');

  element.empty();
  element.attr('action', action); // yes, we're putting an action on a div. Sue me.
  $('.content form#'+form+' div.form.element').each(function() {
    $(this).clone().appendTo(element);
  });

  renderForm(element);
  // short pause to let the form be rebuilt. Prevents screen flashing.
  setTimeout(function() { element.show(); }, 100);
  return setInterval(function() { renderForm(element); }, 3000);
}