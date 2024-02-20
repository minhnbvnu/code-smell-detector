function collapseAlerts(isExpanded) {
    const alertsContainer = $('.alert-collapsible');
    const toggleAllBtn = $('#toggleAllAlertsBtn');

    if (isExpanded) {
        alertsContainer.collapse('show');
        toggleAllBtn.text('Collapse All');
        toggleAllBtn.data('is-expanded', true);
    } else {
        alertsContainer.collapse('hide');
        toggleAllBtn.text('Expand All');
        toggleAllBtn.data('is-expanded', false);
    }
}