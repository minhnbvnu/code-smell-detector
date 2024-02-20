function state_detail(ioc_id) {
    url = '/manage/case-states/update/' + ioc_id + '/modal' + case_param();
    $('#modal_add_type_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_case_state').on("click", function () {
            var form = $('form#form_new_case_state').serializeObject();

            post_request_api('/manage/case-states/update/' + ioc_id, JSON.stringify(form))
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