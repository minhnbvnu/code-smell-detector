function new_ip_dialog(e) {
    var dialog = $(this).find("form");
    var ref = dialog.find('#id_indicator_reference').closest('tr');

    dialog.find('#id_add_indicator').unbind('change')
        .bind('change', function(e) {
        if ($(this).prop('checked')) {
            ref.show();
        } else {
            ref.hide();
        }
        }).trigger('change');

    // If there is selected text, default the value in the form
    check_selected('ip', dialog);
}