async function deleteBatchAlerts(data_content= {}) {
    const selectedAlerts = getBatchAlerts();
    if (selectedAlerts.length === 0) {
        notify_error('Please select at least one alert to perform this action on.');
        return;
    }

    do_deletion_prompt(`You are about to delete ${selectedAlerts.length} alerts`, true)
    .then((doDelete) => {
       window.swal({
              title: "Alerts are being deleted, please wait",
              text: "This window will close automatically when it's done",
              icon: "/static/assets/img/loader.gif",
              button: false,
              allowOutsideClick: false
        });
        if (doDelete) {
            const data = {
                'alert_ids': selectedAlerts,
                'csrf_token': $('#csrf_token').val()
            }

            return post_request_api('/alerts/batch/delete', JSON.stringify(data)).then(
                (data) => {
                    if (notify_auto_api(data)) {
                        setFormValuesFromUrl();
                    }
                }).always(() => {
                window.swal.close();
            });
        }
    });
}