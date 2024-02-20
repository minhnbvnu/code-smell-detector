function add_state() {
    url = '/manage/case-states/add/modal' + case_param();
    $('#modal_add_type_content').load(url, function () {

        $('#submit_new_case_state').on("click", function () {
            var form = $('form#form_new_case_state').serializeObject();

            post_request_api('/manage/case-states/add', JSON.stringify(form), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_state_table();
                    $('#modal_add_type').modal('hide');
                }
            });

            return false;
        })
    });
    $('#modal_add_type').modal({ show: true });
}