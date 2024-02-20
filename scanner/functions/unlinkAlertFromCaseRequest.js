async function unlinkAlertFromCaseRequest(alert_id, case_id) {
    return await post_request_api(`/alerts/unmerge/${alert_id}`, JSON.stringify({
        target_case_id: case_id,
        csrf_token: $('#csrf_token').val()
    }));
}