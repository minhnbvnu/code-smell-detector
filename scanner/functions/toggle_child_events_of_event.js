function toggle_child_events_of_event(event_id) {
    let child_events = $('.timeline-child-' + event_id);
    let event = $('#event_' + event_id);

    if (child_events.is(':visible')) {
        child_events.hide();
        let btn = $('#event_' + event_id).find('button:last');
        if (btn.html().indexOf('fa-chevron-down') !== -1) {
            btn.html('<span class="btn-label"><i class="fa fa-chevron-right"></i> Child events</span>');
        }
    } else {
        child_events.show();
        let btn = $('#event_' + event_id).find('button:last');
        if (btn.html().indexOf('fa-chevron-right') !== -1) {
            btn.html('<span class="btn-label"><i class="fa fa-chevron-down"></i></span>');
        }
    }
}