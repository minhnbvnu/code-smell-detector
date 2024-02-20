function update_user_case_access_level(user_id, case_id, access_level) {
    var data = {
        "case_id": parseInt(case_id),
        "user_id": parseInt(user_id),
        "access_level": parseInt(access_level),
        "csrf_token": $('#csrf_token').val()
    };

    post_request_api('/case/access/set-user', JSON.stringify(data), false, null, case_id)
    .done((data) => {
        notify_auto_api(data);
    });
}