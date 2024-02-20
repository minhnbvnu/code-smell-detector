function post_request_api(uri, data, propagate_api_error, beforeSend_fn, cid, onError_fn) {
   if (cid === undefined ) {
     cid = case_param();
   } else {
     cid = '?cid=' + cid;
   }

   if (data === undefined || data === null) {
        data = JSON.stringify({
            'csrf_token': $('#csrf_token').val()
        });
   }

   return $.ajax({
        url: uri + cid,
        type: 'POST',
        data: data,
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        beforeSend: function(jqXHR, settings) {
            if (typeof beforeSend_fn === 'function') {
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