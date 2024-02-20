function getFilterFromLink(){
    queryString = window.location.search;
    urlParams = new URLSearchParams(queryString);

    if (urlParams.get('filter') !== undefined) {
        return urlParams.get('filter')
    }
    return null;
}