function delete_session(on_success, on_error) {
  load_resource("delete", "/sessions/current", null, on_success, on_error);
}