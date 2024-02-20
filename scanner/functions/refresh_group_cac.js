function refresh_group_cac(group_id) {
    if (modal_group_cac_table !== undefined) {
        get_request_api('/manage/groups/' + group_id)
        .done((data) => {
            if(notify_auto_api(data)) {
                current_group_cases_access_list = data.data.group_cases_access;
                modal_group_cac_table.clear();
                modal_group_cac_table.rows.add(current_group_cases_access_list).draw();
            }
        });
    }
}