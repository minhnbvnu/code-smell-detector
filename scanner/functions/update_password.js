function update_password(user_id) {
    url = 'update/modal' + case_param();
    $('#modal_pwd_user_content').load(url, function (response, status, xhr) {
        if (status !== "success") {
             ajax_notify_error(xhr, url);
             return false;
        }
    });
    $('#modal_pwd_user').modal({ show: true });
}