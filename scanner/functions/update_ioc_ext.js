function update_ioc_ext(ioc_id, do_close) {
    if(!$('form#form_new_ioc').valid()) {
        return false;
    }

    if (ioc_id === undefined || ioc_id === null) {
        ioc_id = g_ioc_id;
    }

    var data = $('#form_new_ioc').serializeObject();
    data['ioc_tags'] = $('#ioc_tags').val();
    ret = get_custom_attributes_fields();
    has_error = ret[0].length > 0;
    attributes = ret[1];

    if (has_error){return false;}
    data['ioc_description'] = g_ioc_desc_editor.getValue();
    data['custom_attributes'] = attributes;

    post_request_api('ioc/update/' + ioc_id, JSON.stringify(data), true)
    .done((data) => {
        if (data.status == 'success') {
            reload_iocs();

            $('#submit_new_ioc').text("Saved").addClass('btn-outline-success').removeClass('btn-outline-danger').removeClass('btn-outline-warning');
            $('#last_saved').removeClass('btn-danger').addClass('btn-success');
            $('#last_saved > i').attr('class', "fa-solid fa-file-circle-check");

            if (do_close !== undefined && do_close === true) {
                $('#modal_add_ioc').modal('hide');
            }

            notify_success(data.message);

        } else {
            $('#submit_new_ioc').text('Save again');
            swal("Oh no !", data.message, "error")
        }
    })

}