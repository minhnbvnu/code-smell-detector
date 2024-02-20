function add_evidence_type() {
    var url = '/manage/evidence-types/add/modal' + case_param();
    $('#modal_add_type_content').load(url, function () {

        $('#submit_new_evidence_type').on("click", function () {
            var form = $('form#form_new_evidence_type').serializeObject();

            post_request_api('/manage/evidence-types/add', JSON.stringify(form), true)
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