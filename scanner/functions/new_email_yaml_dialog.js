function new_email_yaml_dialog(e) {
    var buttons = $("#dialog-new-email-yaml").dialog("option", "buttons");
    $.extend(buttons, {"Add Template": function() {
                add_email_yaml_template();
        // $('#upload-email-yaml-form').parent().find('button:contains("Add Template")').attr('disabled', true).addClass('ui-state-disabled');
            }});
    $("#dialog-new-email-yaml").dialog("option", "buttons", buttons);

    file_upload_dialog(e);
}