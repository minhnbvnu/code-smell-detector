function unlinkAlertFromCase(alert_id, case_id) {

    do_deletion_prompt(`Unlink alert #${alert_id} from the case #${case_id}?`, true)
        .then( () => {
            unlinkAlertFromCaseRequest(alert_id, case_id)
                .then((data) => {
                    if (!notify_auto_api(data)) {
                        return;
                    }
                    refreshAlert(alert_id);
                });
    });

}