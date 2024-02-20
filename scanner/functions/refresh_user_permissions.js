function refresh_user_permissions() {
    var ori_txt = $('#user_refresh_perms_btn').text();
    $('#user_refresh_perms_btn').text('Refreshing..');
     get_request_api('refresh-permissions')
    .done((data) => {
        notify_auto_api(data);
    }).always(() => {
        $('#user_refresh_perms_btn').text(ori_txt);

    });
}