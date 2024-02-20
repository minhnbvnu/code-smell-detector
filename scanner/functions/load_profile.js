function load_profile(name, on_success, on_error) {
  load_resource("get", "/users/slug?slug="+name, null, on_success, on_error);
}