function duplicate_event(id) {
    window.location.hash = id;
    clear_api_error();

    get_request_api("timeline/events/duplicate/" + id)
    .done((data) => {
        if(notify_auto_api(data)) {
            if ("data" in data && "event_id" in data.data)
            {
                window.location.hash = data.data.event_id;
            }
            apply_filtering();
        }
    });

}