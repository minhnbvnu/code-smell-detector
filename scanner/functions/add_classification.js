function add_classification() {
    url = '/manage/case-classifications/add/modal' + case_param();
    $('#modal_add_type_content').load(url, function () {

        $('#submit_new_case_classification').on("click", function () {
            var form = $('form#form_new_case_classification').serializeObject();

            post_request_api('/manage/case-classifications/add', JSON.stringify(form), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_classification_table();
                    $('#modal_add_type').modal('hide');
                }
            });

            return false;
        })
    });
    $('#modal_add_type').modal({ show: true });
}