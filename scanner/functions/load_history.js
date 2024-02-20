function load_history(s, on_success, on_error) {
  load_resource("get", "/spaces/"+ s._id +"/digest", null, on_success, on_error);
}