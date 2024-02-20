function add_event(parent_event_id = null) {
    url = 'timeline/events/add/modal' + case_param();
    $('#modal_add_event_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        g_event_desc_editor = get_new_ace_editor('event_description', 'event_desc_content', 'target_event_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                            }, null);

        g_event_desc_editor.setOption("minLines", "10");
        let headers = get_editor_headers('g_event_desc_editor', null, 'event_edition_btn');
        $('#event_edition_btn').append(headers);
        edit_in_event_desc();

        let parent_selector = $('#parent_event_id');

        // Add empty option
        let option = $('<option>');
        option.attr('value', '');
        option.text('No parent event');
        parent_selector.append(option);

        // Add all events to the parent selector
        for (let idx in current_timeline) {
            let event = current_timeline[idx];
            let option = $('<option>');
            option.attr('value', event.event_id);
            option.text(`${event.event_title}`);
            parent_selector.append(option);
        }

        parent_selector.selectpicker({
            liveSearch: true,
            size: 10,
            width: '100%',
            title: 'Select a parent event',
            style: 'btn-light',
            noneSelectedText: 'No event selected',
        });

        if (parent_event_id != null) {
            parent_selector.selectpicker('val', parent_event_id);
            parent_selector.selectpicker("refresh");
        }

        $('#submit_new_event').on("click", function () {
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

            post_request_api('timeline/events/add', JSON.stringify(data_sent), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    window.location.hash = data.data.event_id;
                    apply_filtering();
                    $('#modal_add_event').modal('hide');
                }
            });

            return false;
        })

        $('#modal_add_event').modal({ show: true });
        $('#event_title').focus();

    });
}