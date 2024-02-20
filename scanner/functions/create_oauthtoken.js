function create_oauthtoken(on_success, on_error) {
  load_resource("get", "/users/oauth2callback/url", null, on_success, on_error);
}