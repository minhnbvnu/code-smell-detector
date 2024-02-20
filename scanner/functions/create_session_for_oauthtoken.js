function create_session_for_oauthtoken(token, on_success, on_error) {
  load_resource("get", "/users/loginorsignupviagoogle?code="+token, null, on_success, on_error);
}