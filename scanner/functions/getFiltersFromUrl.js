function getFiltersFromUrl() {
    const formData = new FormData($('#alertFilterForm')[0]);
    return Object.fromEntries(formData.entries());
}