function edit_event(id) {
  url = '/case/timeline/events/' + id + '/modal' + case_param();
  window.location.hash = id;
  $('#modal_add_event_content').load(url, function (response, status, xhr) {
        hide_minimized_modal_box();
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        
        g_event_id = id;
        g_event_desc_editor = get_new_ace_editor('event_description', 'event_desc_content', 'target_event_desc',
                            function() {
                                $('#last_saved').addClass('btn-danger').removeClass('btn-success');
                                $('#last_saved > i').attr('class', "fa-solid fa-file-circle-exclamation");
                            }, null);
        g_event_desc_editor.setOption("minLines", "6");
        preview_event_description(true);
        headers = get_editor_headers('g_event_desc_editor', null, 'event_edition_btn');
        $('#event_edition_btn').append(headers);
        edit_in_event_desc();

        let parent_selector = $('#parent_event_id');

        // Add empty option
        let option = $('<option>');
        option.attr('value', '');
        option.text('No parent event');
        parent_selector.append(option);

        let target_idx = 0;
        // Add all events to the parent selector and remove the current event
        for (let idx in current_timeline) {
            let event = current_timeline[idx];

            if (event.event_id === id) {
                target_idx = event.parent_event_id;
                continue;
            }

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

        if (target_idx!= null) {
            parent_selector.selectpicker('val', target_idx);
            parent_selector.selectpicker("refresh");
        }

        load_menu_mod_options_modal(id, 'event', $("#event_modal_quick_actions"));
        $('#modal_add_event').modal({show:true});
  });
}