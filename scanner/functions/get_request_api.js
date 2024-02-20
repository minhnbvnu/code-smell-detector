function get_request_api(uri, propagate_api_error, beforeSend_fn, cid) {
    if (cid === undefined ) {
     cid = case_param();
    } else {
     cid = '?cid=' + cid;
    }

    uri = uri + cid;
    return get_raw_request_api(uri, propagate_api_error, beforeSend_fn)
}