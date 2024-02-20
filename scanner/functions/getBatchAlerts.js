function getBatchAlerts() {
    const selectedAlerts = [];
    $('.tickbox input[type="checkbox"]').each(function() {
        if ($(this).is(':checked')) {
          const alertId = $(this).data('alert-id');
          selectedAlerts.push(alertId);
        }
    });
    return selectedAlerts;
}