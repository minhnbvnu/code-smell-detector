function events_set_attribute(attribute, color) {

    var attribute_value;

    var selected_rows = $(".timeline-selected");

    if(selected_rows.length <= 0) {
        console.log("no rows selected, returning");
        return true;
    }

    switch(attribute) {
        case "event_in_graph":
            break;
        case "event_in_summary":
            break;
        case "event_color":
            attribute_value = color;
            var color_buttons = $(".btn-conditional-2");
            color_buttons.slideToggle(250);
            break;
        default:
            console.log("invalid argument given");
            return false;
    }

    //loop through events and toggle/set selected attribute
    selected_rows.each(function(index) {
        var object = selected_rows[index];
        var event_id = object.getAttribute('id').replace("event_",""); 

        var original_event;

        //get event data
        get_request_api("timeline/events/" + event_id)
        .done((data) => {
            original_event = data.data;
            if(notify_auto_api(data, true)) {
                //change attribute to selected value
                if(attribute === 'event_in_graph' || attribute === 'event_in_summary'){
                    attribute_value = original_event[attribute];
                    original_event[attribute] = !attribute_value;
                } else if(attribute === 'event_color') {
                    // attribute value already set to color L240
                    original_event[attribute] = attribute_value;
                }

                //add csrf token to request
                original_event['csrf_token'] = $("#csrf_token").val();
                delete original_event['event_comments_map'];

                //send updated event to API
                post_request_api('timeline/events/update/' + event_id, JSON.stringify(original_event), true)
                .done(function(data) {
                    notify_auto_api(data);
                    if (index === selected_rows.length - 1) {
                        get_or_filter_tm(function() {
                            selected_rows.each(function() {
                                var event_id = this.getAttribute('id')
                                $('#' + event_id).addClass("timeline-selected");
                            });
                        });
                    }
                });
            }
        });
    });
}