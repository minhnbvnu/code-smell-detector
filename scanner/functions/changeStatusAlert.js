function changeStatusAlert(alert_id, status_name) {
    let status_id = getAlertStatusId(status_name);

    let data = {
        'alert_status_id': status_id
    }
    updateAlert(alert_id, data, true);
}