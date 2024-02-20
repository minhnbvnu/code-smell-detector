async function updateAlert(alert_id, data = {}, do_refresh = false, collapse_toggle = false) {
  data['csrf_token'] = $('#csrf_token').val();
  return post_request_api('/alerts/update/' + alert_id, JSON.stringify(data)).then(function (data) {
    if (notify_auto_api(data)) {
      if (do_refresh) {
        const expanded = $(`#additionalDetails-${alert_id}`).hasClass('show');
        return refreshAlert(alert_id, data.data, expanded)
            .then(() => {
                const updatedAlertElement = $(`#alertCard-${alert_id}`);
                if (updatedAlertElement.length) {
                    updatedAlertElement.addClass('fade-it');
                }
            });
      }
    }
  });
}