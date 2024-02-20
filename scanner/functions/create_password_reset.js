function create_password_reset(email, on_success, on_error) {
  load_resource("post", "/users/password_reset_requests?email=" + encodeURIComponent(email), null,  on_success, on_error);
}