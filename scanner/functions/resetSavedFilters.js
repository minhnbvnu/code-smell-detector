function resetSavedFilters(queryParams = null, replaceState = true) {
    if (queryParams === null || queryParams === undefined) {
        queryParams = new URLSearchParams(window.location.search);
    }
    queryParams.delete('filter_id');
    if (replaceState) {
        window.history.replaceState(null, null, `?${queryParams.toString()}`);
    }
    $('#savedFilters').selectpicker('val', '');

    return queryParams;
}