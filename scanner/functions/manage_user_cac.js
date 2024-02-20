function manage_user_cac(user_id) {
    url = 'users/' + user_id + '/cases-access/modal' + case_param();

    $('#manage_user_cac_button').text('Loading manager...');

    $('#modal_ac_additional').load(url, function (response, status, xhr) {
        $('#manage_user_cac_button').text('Set case access');
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#grant_case_access_to_user').on("click", function () {
            clear_api_error();

            var data_sent = Object();

            data_sent['cases_list'] = $('#user_case_access_select').val();
            data_sent['access_level'] = parseInt($('#user_case_ac_select').val());
            data_sent['csrf_token'] = $('#csrf_token').val();

            post_request_api('users/' + user_id + '/cases-access/update', JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_user_cac(user_id);
                    $('#modal_ac_additional').modal('hide');
                }
            });

            return false;
        });
        $('#modal_ac_additional').modal({ show: true });
    });
}