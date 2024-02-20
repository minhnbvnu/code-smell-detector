function get_or_filter_tm(post_req_fn) {
    filter = getFilterFromLink();
    if (filter) {
        tm_filter.setValue(filter);
        apply_filtering(post_req_fn);
    } else {
        apply_filtering(post_req_fn);
    }
}