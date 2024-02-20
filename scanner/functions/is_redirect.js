function is_redirect() {
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);

    return urlParams.get('redirect')
}