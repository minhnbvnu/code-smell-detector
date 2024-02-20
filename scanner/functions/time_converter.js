function time_converter(){
    date_val = $('#event_date_convert_input').val();

    var data_sent = Object();
    data_sent['date_value'] = date_val;
    data_sent['csrf_token'] = $('#csrf_token').val();

    post_request_api('timeline/events/convert-date', JSON.stringify(data_sent))
    .done(function(data) {
        if(notify_auto_api(data)) {
            $('#event_date').val(data.data.date);
            $('#event_time').val(data.data.time);
            $('#event_tz').val(data.data.tz);
            hide_time_converter();
            $('#convert_bad_feedback').text('');
        }
    })
    .fail(function() {
        $('#convert_bad_feedback').text('Unable to find a matching pattern for the date');
    });
}