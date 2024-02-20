function user_detail(user_id, goto_tab) {
    url = 'users/' + user_id + '/modal' + case_param();
    $('#modal_access_control').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#submit_new_user').on("click", function () {
            clear_api_error();

            var data_sent = $('#form_new_user').serializeObject();
            post_request_api('/manage/users/update/' + user_id, JSON.stringify(data_sent), true)
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_users();
                    $('#modal_access_control').modal('hide');
                }
            });

            return false;
        })
        if (goto_tab !== undefined) {
            $('.nav-pills a[href="#'+ goto_tab +'"]').tab('show');
        }
        $('#modal_access_control').modal({ show: true });
    });

}