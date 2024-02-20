function create_session(email, password, on_success, on_error) {
  load_resource("post", "/sessions", {email:email, password:password}, on_success, on_error);
}