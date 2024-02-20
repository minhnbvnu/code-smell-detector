function manage_user_clients(user_id) {
    let url = 'users/' + user_id + '/customers/modal' + case_param();
    $('#modal_ac_additional').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
        $('#modal_ac_additional').modal({ show: true });

        $('#save_user_customers_membership').on("click", function () {
            clear_api_error();

            let data_sent = Object();
            data_sent['customers_membership'] = $('#user_customers_membership').val();
            data_sent['csrf_token'] = $('#csrf_token').val();

            post_request_api('/manage/users/' + user_id + '/customers/update', JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    user_detail(user_id, 'user_clients_tab');
                }
            });
        });
    });

}