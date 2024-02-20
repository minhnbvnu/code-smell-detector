function escalateOrMergeAlert(alert_id, merge = false, batch = false) {

    const selectedIOCs = $('#ioCsList input[type="checkbox"]:checked').map((_, checkbox) => {
        return $(checkbox).attr('id');
    }).get();

    const selectedAssets = $('#assetsList input[type="checkbox"]:checked').map((_, checkbox) => {
        return $(checkbox).attr('id');
    }).get();

    const note = $('#note').val();
    const importAsEvent = $('#importAsEvent').is(':checked');

    let case_template_id = null;

    if (!merge) {
        case_template_id = $('#mergeAlertCaseTemplateSelect').val();
    }

    const requestBody = {
        iocs_import_list: selectedIOCs,
        assets_import_list: selectedAssets,
        note: note,
        import_as_event: importAsEvent,
        case_tags: $('#case_tags').val(),
        case_template_id: case_template_id,
        csrf_token: $("#csrf_token").val()
    };

    let url =  batch ? `/alerts/batch/`: `/alerts/`;

    if (merge) {
        requestBody.target_case_id = $('#mergeAlertCaseSelect').val();
        url += batch ? 'merge' : `merge/${alert_id}`;
    } else {
        requestBody.case_title = $('#modalEscalateCaseTitle').val();
        url += batch ? 'escalate' : `escalate/${alert_id}`;
    }

    if (batch) {
        requestBody.alert_ids = alert_id;
    }

    post_request_api(url, JSON.stringify(requestBody))
        .then((data) => {
            if (data.status == 'success') {
                $("#escalateModal").modal("hide");
                notify_auto_api(data);
                if (batch) {
                    refreshAlerts();
                } else {
                    refreshAlert(alert_id);
                }
            } else {
                notify_auto_api(data);
            }
        });
}