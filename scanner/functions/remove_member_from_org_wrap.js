function remove_member_from_org_wrap(org_id, user_id) {
    remove_members_from_org(org_id, user_id, function() {
        user_detail(user_id, 'user_orgs_tab');
    });
}