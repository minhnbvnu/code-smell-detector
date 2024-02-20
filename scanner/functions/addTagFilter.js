function addTagFilter(this_object) {
    let tag_name = $(this_object).data('tag');
    let filters = getFiltersFromUrl();

    if (filters['alert_tags']) {
        for (let tag of filters['alert_tags'].split(',')) {
            if (tag === tag_name) {
                return;
            }
        }
        filters['alert_tags'] += `,${tag_name}`;
    } else {
        filters['alert_tags'] = tag_name;
    }

    const queryParams = new URLSearchParams(window.location.search);
    let page_number = parseInt(queryParams.get('page'));
    let per_page = parseInt(queryParams.get('per_page'));

    updateAlerts(page_number, per_page, filters)
        .then(() => {
            notify_success('Refreshed');
            $('#newAlertsBadge').text(0).hide();
        });
}