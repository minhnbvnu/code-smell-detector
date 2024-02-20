function confirm_password_reset(password, confirm, on_success, on_error) {
  load_resource("post", "/users/password_reset_requests/"+confirm+"/confirm", {password:password}, on_success, on_error);
}