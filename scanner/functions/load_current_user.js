function load_current_user(on_success, on_error) {
  load_resource("get", "/users/current", null, on_success, on_error);
}