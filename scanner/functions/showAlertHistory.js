async function showAlertHistory(alertId) {
    const alertDataReq = await fetchAlert(alertId);
    if (!notify_auto_api(alertDataReq, true)) {
        return;
    }
    let alertData = alertDataReq.data;
    let entryDiv = $('#modal_alert_history_content');

    for (let entry in alertData.modification_history)  {
        let date = new Date(Math.floor(entry) * 1000);
        let dateStr = date.toLocaleString();
        let entryStr = alertData.modification_history[entry];
        entryDiv.append('<div class="row"><div class="col-3">' + dateStr + '</div><div class="col-3">' + entryStr.user + '</div><div class="col-6">'+ entryStr.action +'</div></div>');

    }

    $('#modal_alert_history').modal('show');
}