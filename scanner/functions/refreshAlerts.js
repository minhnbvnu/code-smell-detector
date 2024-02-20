function refreshAlerts(){
    const queryParams = new URLSearchParams(window.location.search);
    let page_number = parseInt(queryParams.get('page'));
    let per_page = parseInt(queryParams.get('per_page'));

    const formData = new FormData($('#alertFilterForm')[0]);
    const filters = Object.fromEntries(formData.entries());

    updateAlerts(page_number, per_page, filters)
        .then(() => {
            notify_success('Refreshed');
            $('#newAlertsBadge').text(0).hide();
        });
}