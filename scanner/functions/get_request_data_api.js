function get_request_data_api(uri, data, propagate_api_error, beforeSend_fn) {
    return $.ajax({
        url: uri + case_param(),
        type: 'GET',
        data: data,
        dataType: "json",
        beforeSend: function(jqXHR, settings) {
            if (beforeSend_fn !== undefined) {
                beforeSend_fn(jqXHR, settings);
            }
        },
        error: function(jqXHR) {
            if (propagate_api_error) {
                if(jqXHR.responseJSON && jqXHR.status == 400) {
                    propagate_form_api_errors(jqXHR.responseJSON.data);
                } else {
                    ajax_notify_error(jqXHR, this.url);
                }
            } else {
                if(jqXHR.responseJSON) {
                    notify_error(jqXHR.responseJSON.message);
                } else {
                    ajax_notify_error(jqXHR, this.url);
                }
            }
        }
    });
}