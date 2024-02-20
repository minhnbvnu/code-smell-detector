function validateForm(form) {
  var success = true;

  form.children('div.form.element.required').each(function() {
    var count  = $(this).find(':input:checked').length;
    var value  = $.trim($(this).children('input:text, textarea, select').first().val());

    // if we have no checked inputs or content, then flag it
    if(count || (value && value)) {
      $(this).closest('div.form.element').removeClass('warning');
    }
    else {
      $(this).closest('div.form.element').addClass('warning');
      success = false;
    }

  });

  return success;
}