function create_feedback(user, m, on_success, on_error) {
  load_resource("post", "/users/feedback", {text: m}, on_success, on_error);
}