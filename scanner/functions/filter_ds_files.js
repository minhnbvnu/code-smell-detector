function filter_ds_files() {

    ds_keywords = ['storage_name', 'name', 'tag', 'description', 'is_ioc', 'is_evidence', 'has_password', 'uuid', 'id', 'sha256'];
    parsed_filter_ds = {};
    parse_filter(ds_filter.getValue(), ds_keywords);
    filter_query = encodeURIComponent(JSON.stringify(parsed_filter_ds));

    $('#btn_filter_ds_files').text('Searching..');
    get_request_data_api("/datastore/list/filter",{ 'q': filter_query })
    .done(function (data){
        if(notify_auto_api(data, true)){
            $('#ds-tree-root').empty();
            build_ds_tree(data.data, 'ds-tree-root');
            reparse_activate_tree();
            show_datastore();
        }
    })
    .always(() => {
        $('#btn_filter_ds_files').text('Search');
    });
}