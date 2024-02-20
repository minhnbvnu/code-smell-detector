function upload_new_signature_version_dialog_submit(e) {
    var dialog = $(this).closest(".ui-dialog").find(".ui-dialog-content");
    var form = $(this).find("form");
    form.attr('action', $('#upload-new-signature-version').attr('data-action'));
    var data = form.serialize();
    $.ajax({
        type: "POST",
        url: form.attr('action'),
        data: data,
        datatype: 'json',
        success: function(data) {
            $('#form-upload-new-signature-version-results').html(data.message).show();
        }
    });
}