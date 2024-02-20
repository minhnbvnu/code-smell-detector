async function updateBatchAlerts(data_content= {}) {
    const selectedAlerts = getBatchAlerts();
    if (selectedAlerts.length === 0) {
        notify_error('Please select at least one alert to perform this action on.');
        return;
    }

    const data = {
        'alert_ids': selectedAlerts,
        'csrf_token': $('#csrf_token').val(),
        'updates': data_content
    };

       window.swal({
          title: "Alerts are being updated, please wait",
          text: "This window will close automatically when it's done",
          icon: "/static/assets/img/loader.gif",
          button: false,
          allowOutsideClick: false
        });

    return post_request_api('/alerts/batch/update', JSON.stringify(data)).then(function (data) {
        if (notify_auto_api(data)) {
            setFormValuesFromUrl();
        }
    }).always(() => {
        window.swal.close();
    });

}