function delete_alert(alert_id) {
    do_deletion_prompt(`Are you sure you want to delete alert #${alert_id}?`, true)
        .then((doDelete) => {
            if (doDelete) {
                post_request_api(`/alerts/delete/${alert_id}`)
                    .then((data) => {
                        if (notify_auto_api(data)) {
                            setFormValuesFromUrl();
                        }
                    });
            }
        });
}