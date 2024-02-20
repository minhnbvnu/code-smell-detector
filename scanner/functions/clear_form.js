function clear_form(dialog) {
    var form = dialog.find("form");

    //clear any values from last edit, unless they are radio buttons
    var input_clear_filter = form.attr('input_clear_filter');


    var inputs = form.find('input,select,textarea').not(".no_clear").not('[type="radio"],[type="checkbox"],[type="submit"]');
    if (input_clear_filter) {
    inputs = inputs.filter(input_clear_filter);
    }

    // Note: 'select' intentionally removed from resetting for now (as it was before)
    // Defaulting selects to an option that says "Please select ..." with a blank/null value may be preferred in future
    inputs.not("select").val('');

    // Remove old errors.
    form.find('ul.errorlist').remove();

    //default radio buttons to the first option
    var radios = form.find('input[type="radio"]').parents('li');
    for (var i = 0; i < radios.length; ++i) {
        if ($(radios[i]).index() == 0) {
            $(radios[i]).find('input').prop('checked', true);
        }
    }

    //default analyst, if it exists, to current user
    form.find('input[name="analyst"]').val(username);
}