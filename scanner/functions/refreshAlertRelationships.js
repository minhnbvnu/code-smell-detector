function refreshAlertRelationships(alertId) {
    // Get the checked status of each checkbox
    let fetch_open_alerts = $(`input[name="open_alerts_${alertId}"]`).prop('checked');
    let fetch_closed_alerts = $(`input[name="closed_alerts_${alertId}"]`).prop('checked');
    let fetch_open_cases = $(`input[name="open_cases_${alertId}"]`).prop('checked');
    let fetch_closed_cases = $(`input[name="closed_cases_${alertId}"]`).prop('checked');

    fetchSimilarAlerts(alertId, true, fetch_open_alerts, fetch_closed_alerts,
        fetch_open_cases, fetch_closed_cases);
}