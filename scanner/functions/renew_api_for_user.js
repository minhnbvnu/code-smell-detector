function renew_api_for_user(user_id) {
    var ori_txt = $('#users_renew_api_btn').text();
    $('#users_renew_api_btn').text('Renewing..');
    post_request_api('/manage/users/renew-api-key/' + user_id)
    .done((data) => {
        if (notify_auto_api(data)) {
            $('#userApiKey').val(data.data.api_key);
        }
    }).always(() => {
        $('#users_renew_api_btn').text(ori_txt);
    });
}