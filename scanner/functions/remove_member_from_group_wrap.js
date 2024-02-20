function remove_member_from_group_wrap(group_id, user_id) {
    remove_members_from_group(group_id, user_id, function() {
        user_detail(user_id, 'user_groups_tab');
    });
}