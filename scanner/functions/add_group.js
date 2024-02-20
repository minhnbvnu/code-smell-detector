function add_group() {
    url = '/manage/groups/add/modal' + case_param();
    $('#modal_access_control').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_group').on("click", function () {
             clear_api_error();
            var data_sent = $('#form_new_group').serializeObject();
            post_request_api('/manage/groups/add', JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_groups();
                    $('#modal_access_control').modal('hide');
                }
            });
        });
        $('#modal_access_control').modal({ show: true });
    });
}