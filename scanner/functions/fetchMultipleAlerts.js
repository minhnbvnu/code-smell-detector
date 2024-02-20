async function fetchMultipleAlerts(alertIds) {
    const response = get_raw_request_api(`/alerts/filter?cid=${get_caseid()}&alert_ids=${alertIds.join(',')}`);
    return await response;
}