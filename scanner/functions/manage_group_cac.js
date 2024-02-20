function manage_group_cac(group_id) {
    url = 'groups/' + group_id + '/cases-access/modal' + case_param();

    $('#manage_group_cac_button').text('Loading manager...');

    $('#modal_ac_additional').load(url, function (response, status, xhr) {
        $('#manage_group_cac_button').text('Set case access');
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }

        $('#grant_case_access_to_group').on("click", function () {
            clear_api_error();

            var data_sent = Object();
            data_sent['access_level'] = parseInt($('#group_case_ac_select').val());
            data_sent['cases_list'] = $('#group_case_access_select').val();
            data_sent['auto_follow_cases'] = $('#enable_auto_follow_cases').is(':checked');
            data_sent['csrf_token'] = $('#csrf_token').val();

            window.swal({
                  title: "Updating access",
                  text: "Please wait. We are updating users access.",
                  icon: "/static/assets/img/loader_cubes.gif",
                  button: false,
                  allowOutsideClick: false
            });

            post_request_api('groups/' + group_id + '/cases-access/update', JSON.stringify(data_sent))
            .done((data) => {
                if(notify_auto_api(data)) {
                    refresh_group_cac(group_id);
                    $('#modal_ac_additional').modal('hide');
                }
            })
            .always(() => {
                window.swal.close();
            });

            return false;
        });
        $('#modal_ac_additional').modal({ show: true });
    });
}