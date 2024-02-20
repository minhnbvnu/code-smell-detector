function fetchSmartRelations(alert_id) {
    $(`input[name="open_alerts_${alert_id}"]`).prop('checked', true);
    $(`input[name="closed_alerts_${alert_id}"]`).prop('checked', false);
    $(`input[name="open_cases_${alert_id}"]`).prop('checked', false);
    $(`input[name="closed_cases_${alert_id}"]`).prop('checked', false);

    fetchSimilarAlerts(alert_id, false, true, false,
        false, false);
}