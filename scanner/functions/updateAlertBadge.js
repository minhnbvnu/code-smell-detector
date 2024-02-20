function updateAlertBadge() {
    const badge = $('#refreshAlertsBadge');

    if (alertCount > 0) {
        badge.text(alertCount).show();
    } else {
        badge.hide();
    }
}