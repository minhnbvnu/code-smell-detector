function get_query_object() {
    const query_list = [["email", "email_filter"], ["commit", "commit_filter"], ["filename", "filename_filter"], ["datetime", "datetime_filter"]]
    let query = {}
    query_list.forEach((q) => query = {...query, ...get_include_exclude(...q)})
    return query
}