function re_render_form(dialog, form, e) {
    $(dialog).find('table.form tbody').html(form);
    var form = $(dialog).find("form");

    if (form.find(".toggle_upload_type").length) {
    $.proxy(file_upload_dialog, dialog)(e);
    }

    createPickers();
}