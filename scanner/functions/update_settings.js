function update_settings() {
    var data_sent = $('form#form_srv_settings').serializeObject();
    data_sent['prevent_post_mod_repush'] = $('#prevent_post_mod_repush').is(":checked");
    data_sent['prevent_post_objects_repush'] = $('#prevent_post_objects_repush').is(":checked");
    data_sent['password_policy_upper_case'] = $('#password_policy_upper_case').is(":checked");
    data_sent['password_policy_lower_case'] = $('#password_policy_lower_case').is(":checked");
    data_sent['password_policy_digit'] = $('#password_policy_digit').is(":checked");

    post_request_api('/manage/settings/update', JSON.stringify(data_sent), true)
    .done((data) => {
        notify_auto_api(data);
    });
}