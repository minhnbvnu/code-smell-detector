function mergeAlertCasesSelectOption(data) {
    if(notify_auto_api(data, true)) {
        $('#mergeAlertCaseSelect').empty();

        $('#mergeAlertCaseSelect').append('<optgroup label="Open" id="switchMergeAlertCasesOpen"></optgroup>');
        $('#mergeAlertCaseSelect').append('<optgroup label="Closed" id="switchMergeAlertCasesClose"></optgroup>');
        let ocs = data.data;
        let ret_data = [];
        for (index in ocs) {
            let case_name = sanitizeHTML(ocs[index].name);
            let cs_name = sanitizeHTML(ocs[index].customer_name);
            ret_data.push({
                        'value': ocs[index].case_id,
                        'text': `${case_name} (${cs_name}) ${ocs[index].access}`
                    });
            if (ocs[index].close_date != null) {
                $('#switchMergeAlertCasesClose').append(`<option value="${ocs[index].case_id}">${case_name} (${cs_name}) ${ocs[index].access}</option>`);
            } else {
                $('#switchMergeAlertCasesOpen').append(`<option value="${ocs[index].case_id}">${case_name} (${cs_name}) ${ocs[index].access}</option>`)
            }
        }

        return ret_data;
    }
}