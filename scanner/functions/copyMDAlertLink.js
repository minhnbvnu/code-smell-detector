function copyMDAlertLink(alert_id){
    const link = `[<i class="fa-solid fa-bell"></i> #${alert_id}](${buildAlertLink(alert_id)})`;
    navigator.clipboard.writeText(link).then(function() {
        notify_success('MD link copied');
    }, function(err) {
        notify_error('Can\'t copy link. I printed it in console.');
        console.error('Shared link', err);
    });
}