function toggleCollapseAllAlerts() {
    const toggleAllBtn = $('#toggleAllAlertsBtn');
    const isExpanded = toggleAllBtn.data('is-expanded') || false;

    collapseAlerts(!isExpanded);

    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('is-expanded', !isExpanded);
    window.history.replaceState(null, '', '?' + queryParams.toString());
}