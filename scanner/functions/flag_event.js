function flag_event(event_id){
    get_request_api('timeline/events/flag/'+event_id)
    .done(function(data) {
        if (notify_auto_api(data)) {
            if (data.data.event_is_flagged == true) {
                $('#event_'+event_id).find('.fa-flag').addClass('fas text-warning').removeClass('fa-regular');
                $('#event_210').find('.fa-flag').addClass('fas text-warning').removeClass('fa-regular');
            } else {
                $('#event_'+event_id).find('.fa-flag').addClass('fa-regular').removeClass('fas text-warning');
            }
        }
    });
}