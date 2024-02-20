function create_user(name, email, password, password_confirmation, invite_code, on_success, on_error) {
  load_resource("post", "/users", {email:email, nickname:name, password:password, password_confirmation: password_confirmation, invite_code: invite_code}, on_success, on_error);
}