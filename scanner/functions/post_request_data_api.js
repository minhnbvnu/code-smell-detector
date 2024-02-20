function post_request_data_api(uri, data, propagate_api_error, beforeSend_fn) {
   return $.ajax({
        url: uri + case_param(),
        type: 'POST',
        data: data,
        dataType: "json",
        contentType: false,
        processData: false,
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