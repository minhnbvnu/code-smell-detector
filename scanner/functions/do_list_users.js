function do_list_users(list_users, cur_assignees_id_list) {

    $('#task_assignees_id').selectpicker({
        liveSearch: true,
        title: "Select assignee(s)"
    });

    for (let user in list_users) {
        if (list_users[user].user_access_level === 4) {
            $('#task_assignees_id').append(new Option(`${filterXSS(list_users[user].user_login)} (${filterXSS(list_users[user].user_name)})`,
                list_users[user].user_id));
        }
    }

    if (cur_assignees_id_list !== undefined) {
        $('#task_assignees_id').selectpicker('val', cur_assignees_id_list);
    }

    $('#task_assignees_id').selectpicker('refresh');
}