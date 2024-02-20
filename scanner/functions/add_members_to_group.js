function add_members_to_group(group_id) {
    url = 'groups/' + group_id + '/members/modal' + case_param();
    $('#modal_ac_additional').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#save_group_members').on("click", function () {
            clear_api_error();

            var data_sent = Object();
            data_sent['group_members'] = $('#group_members').val();
            data_sent['csrf_token'] = $('#csrf_token').val();

            post_request_api('groups/' + group_id + '/members/update', JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_groups();
                    refresh_group_members(group_id);
                    $('#modal_ac_additional').modal('hide');
                }
            });

            return false;
        });
        $('#modal_ac_additional').modal({ show: true });
    });
}