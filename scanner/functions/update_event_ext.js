function update_event_ext(event_id, do_close) {

    if (event_id === undefined || event_id === null) {
        event_id = g_event_id;
    }

    window.location.hash = event_id;
    clear_api_error();
    var data_sent = $('#form_new_event').serializeObject();
    data_sent['event_date'] = `${$('#event_date').val()}T${$('#event_time').val()}`;
    data_sent['event_in_summary'] = $('#event_in_summary').is(':checked');
    data_sent['event_in_graph'] = $('#event_in_graph').is(':checked');
    data_sent['event_sync_iocs_assets'] = $('#event_sync_iocs_assets').is(':checked');
    data_sent['event_tags'] = $('#event_tags').val();
    data_sent['event_assets'] = $('#event_assets').val();
    data_sent['event_iocs'] = $('#event_iocs').val();
    data_sent['event_tz'] = $('#event_tz').val();
    data_sent['event_content'] = g_event_desc_editor.getValue();
    data_sent['parent_event_id'] = $('#parent_event_id').val() || null;

    ret = get_custom_attributes_fields();
    has_error = ret[0].length > 0;
    attributes = ret[1];

    if (has_error){return false;}

    data_sent['custom_attributes'] = attributes;

    post_request_api('timeline/events/update/' + event_id, JSON.stringify(data_sent), true)
    .done(function(data) {
        if(notify_auto_api(data)) {
            apply_filtering();
            if (do_close !== undefined && do_close === true) {
                $('#modal_add_event').modal('hide');
            }

            $('#submit_new_event').text("Saved").addClass('btn-outline-success').removeClass('btn-outline-danger').removeClass('btn-outline-warning');
            $('#last_saved').removeClass('btn-danger').addClass('btn-success');
            $('#last_saved > i').attr('class', "fa-solid fa-file-circle-check");

        }
    });

}