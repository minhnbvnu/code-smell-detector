function save_user_password(u, pass, newPass, on_success, on_error) {
  load_resource("post", "/users/" + u._id + "/password", {old_password:pass, new_password:newPass}, on_success, on_error);
}