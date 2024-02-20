function copyAlertLink(alert_id) {
    const link = buildAlertLink(alert_id);
    navigator.clipboard.writeText(link).then(function() {
        notify_success('Link copied');
    }, function(err) {
        notify_error('Can\'t copy link. I printed it in console.');
        console.error('Shared link', err);
    });
}