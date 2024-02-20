async function fetchAlert(alertId) {
    const response = get_raw_request_api(`/alerts/${alertId}?cid=${get_caseid()}`);
    return await response;
}