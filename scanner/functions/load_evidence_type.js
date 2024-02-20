function load_evidence_type() {
    get_request_api('/manage/evidence-types/list')
    .done((data) => {
        if(notify_auto_api(data, true)) {
            let ftype = $('#file_type_id');
            if (data.data != null) {
                let options = data.data;
                for (let idx in options) {
                    ftype.append(`<option value="${options[idx].id}">${filterXSS(options[idx].name)}</option>`);
                }
                ftype.selectpicker({
                    liveSearch: true,
                    title: "Evidence type"
                });
                let stored_type_id = $('#store_type_id').data('file-type-id');
                if (stored_type_id !== undefined || stored_type_id !== "") {
                    ftype.selectpicker('val', stored_type_id);
                    ftype.selectpicker('refresh');
                }
            }

        }
    })
}