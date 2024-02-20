function apply_filtering(post_req_fn) {
    keywords = ['asset', 'asset_id', 'tag', 'title', 'description', 'ioc', 'ioc_id',
        'raw', 'category', 'source', 'flag', 'startDate', 'endDate', 'event_id'];

    parsed_filter = {};
    parse_filter(tm_filter.getValue(), keywords);
    filter_query = encodeURIComponent(JSON.stringify(parsed_filter));

    $('#timeline_list').empty();
    show_loader();
    get_request_data_api("/case/timeline/advanced-filter",{ 'q': filter_query })
    .done((data) => {
        if(notify_auto_api(data, true)) {
            build_timeline(data);
            if(post_req_fn !== undefined) {
                post_req_fn();
            }
        }
        goToSharedLink();
    });
}