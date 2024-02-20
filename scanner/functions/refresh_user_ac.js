function refresh_user_ac(user_id) {
    var ori_txt = $('#users_refresh_ac_btn').text();
    $('#users_refresh_ac_btn').text('Refreshing..');
    get_request_api('/manage/access-control/recompute-effective-user-ac/' + user_id)
    .done((data) => {
        notify_auto_api(data);
    }).always(() => {
        $('#users_refresh_ac_btn').text(ori_txt);
    });
}