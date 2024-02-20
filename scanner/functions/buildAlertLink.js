function buildAlertLink(alert_id){
    const current_path = location.protocol + '//' + location.host
    return current_path + '/alerts' + case_param() + '&alert_ids=' + alert_id;
}