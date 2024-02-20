function toggle_child_events() {
    let child_events = $('.timeline-child');
    if (child_events.is(':visible')) {
        child_events.hide();
        // Find the button of the parent event, excluding the child events themselves
        for (let i = 0; i < child_events.length; i++) {
            let child_event = child_events[i];
            let parent_event = $(child_event).prev();
            if (parent_event.hasClass('timeline-child')) {
                continue;
            }
            let btn = parent_event.find('button:last');
            if (btn.html().indexOf('fa-chevron-down') !== -1) {
                btn.html('<span class="btn-label"><i class="fa fa-chevron-right"></i> Child events</span>');
            }
        }


    } else {
        child_events.show();
        for (let i = 0; i < child_events.length; i++) {
            let child_event = child_events[i];
            let parent_event = $(child_event).prev();
            if (parent_event.hasClass('timeline-child')) {
                continue;
            }
            let btn = parent_event.find('button:last');
            if (btn.html().indexOf('fa-chevron-right') !== -1) {
                btn.html('<span class="btn-label"><i class="fa fa-chevron-down"></i></span>');
            }
        }
    }
}