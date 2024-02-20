function evidence_detail(evidence_id) {
    let url = '/manage/evidence-types/update/' + evidence_id + '/modal' + case_param();
    $('#modal_add_type_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_evidence_type').on("click", function () {
            var form = $('form#form_new_evidence_type').serializeObject();

            post_request_api('/manage/evidence-types/update/' + evidence_id, JSON.stringify(form), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_evidence_table();
                    $('#modal_add_type').modal('hide');
                }
            });

            return false;
        })


    });
    $('#modal_add_type').modal({ show: true });
}