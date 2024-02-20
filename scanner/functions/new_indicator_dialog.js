function new_indicator_dialog(e) {
    var dialog = $("#dialog-new-indicator").closest(".ui-dialog");
    var form = dialog.find("form");

    // If there is selected text, default the value in the form
    check_selected('indicator', dialog);
}