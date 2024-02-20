function get_raw_request_api(uri, propagate_api_error, beforeSend_fn) {
    return $.ajax({
        url: uri,
        type: 'GET',
        dataType: "json",
        beforeSend: function(jqXHR, settings) {
            if (beforeSend_fn !== undefined && beforeSend_fn !== null) {
                beforeSend_fn(jqXHR, settings);
            }
        },
        error: function(jqXHR) {
            if (propagate_api_error) {
                if(jqXHR.responseJSON && jqXHR.status === 400) {
                    propagate_form_api_errors(jqXHR.responseJSON.data);
                } else {
                    ajax_notify_error(jqXHR, this.url);
                }
            } else {
                if (jqXHR.status !== 400) {
                    if(jqXHR.responseJSON) {
                        notify_error(jqXHR.responseJSON.message);
                    } else {
                        ajax_notify_error(jqXHR, this.url);
                    }
                }
            }
        }
    });
}