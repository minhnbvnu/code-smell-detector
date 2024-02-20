function refresh_group_members(group_id) {
    if (modal_group_table !== undefined) {
        get_request_api('/manage/groups/' + group_id)
        .done((data) => {
            if(notify_auto_api(data)) {
                modal_group_table.clear();
                modal_group_table.rows.add(data.data.group_members).draw();
            }
        });
    }
}