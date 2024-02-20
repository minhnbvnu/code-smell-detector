function fix_form_submit(submitAction) {
    return function(e) {
    var dialog = $(this).closest(".ui-dialog");
    var form = dialog.find("form");

    form.on('submit', submitAction);
    return true;
    }
}