function update_rfile(rfiles_id) {
    let data_sent = $('form#form_edit_rfile').serializeObject();
    data_sent['csrf_token'] = $('#csrf_token').val();
    data_sent['type_id'] = $('#file_type_id').val();
    let sd = $('#start_date').val();
    let st = $('#start_time').val()
    if (sd && st) {
        data_sent['start_date'] = `${sd}T${st}`;
    }

    let ed = $('#end_date').val();
    let et = $('#end_time').val();
    if (ed && et) {
        data_sent['end_date'] = `${ed}T${et}`;
    }


    let ret = get_custom_attributes_fields();
    let has_error = ret[0].length > 0;
    let attributes = ret[1];

    if (has_error){return false;}

    data_sent['custom_attributes'] = attributes;
    data_sent['file_description'] = g_evidence_desc_editor.getValue();

    post_request_api('evidences/update/' + rfiles_id, JSON.stringify(data_sent), true)
    .done((data) => {
        notify_auto_api(data);
        reload_rfiles();
        $('#modal_add_rfiles').modal("hide");
    });
}