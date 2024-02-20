function get_featured_users(on_success, on_error) {
  load_resource("get", "/users/featured", null, on_success, on_error);
}