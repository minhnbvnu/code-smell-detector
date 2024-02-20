function load_notifications(u, on_success, on_error) {
  load_resource("get", "/notifications", null, on_success, on_error);
}