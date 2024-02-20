function get_caseid() {
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);

    return urlParams.get('cid')
}