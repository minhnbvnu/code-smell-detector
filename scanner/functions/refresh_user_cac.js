function refresh_user_cac(user_id) {
    if (modal_user_cac_table !== undefined) {
        get_request_api('/manage/users/' + user_id)
        .done((data) => {
            if(notify_auto_api(data)) {
                current_user_cases_access_list = data.data.user_cases_access;
                modal_user_cac_table.clear();
                modal_user_cac_table.rows.add(current_user_cases_access_list).draw();
            }
        });
    }
}