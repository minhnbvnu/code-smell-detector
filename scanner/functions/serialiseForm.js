function serialiseForm(form) {
  var values = {};
  var inputs = form.getElementsByTagName('input');
  for (var i = 0, count = inputs.length; i < count; i++) {
    var input = inputs[i];
    // Ignore unselected checkboxes or radio buttons
    if ((input.type === 'checkbox' || input.type === 'radio') && !input.checked) {
      continue;
    }
    values[inputs[i].name] = inputs[i].value;
  }
  return values;
}