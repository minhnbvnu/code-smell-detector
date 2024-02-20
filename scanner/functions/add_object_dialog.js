function add_object_dialog(e) {
    var dialog = $("#dialog-add-object").closest(".ui-dialog");
    var form = dialog.find("form");

    file_upload_dialog(e);
}