function manage_user_organisations(user_id) {
    url = 'users/' + user_id + '/organisations/modal' + case_param();
    $('#modal_ac_additional').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        $('#modal_ac_additional').modal({ show: true });

        $('#save_user_orgs_membership').on("click", function () {
            clear_api_error();

            var data_sent = Object();
            data_sent['orgs_membership'] = $('#user_orgs_membership').val();
            data_sent['csrf_token'] = $('#csrf_token').val();

            post_request_api('/manage/users/' + user_id + '/organisations/update', JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    user_detail(user_id, 'user_orgs_tab');
                }
            });
        });
    });
}