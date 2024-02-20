function deactivate_user(user_id) {
  get_request_api('/manage/users/deactivate/' + user_id)
  .done((data) => {
    if(notify_auto_api(data)) {
        user_detail(user_id);
        refresh_users();
    }
  });
}