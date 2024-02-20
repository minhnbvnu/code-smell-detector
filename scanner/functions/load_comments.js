function load_comments(space_id, on_success, on_error) {
  load_resource("get", "/spaces/"+space_id+"/messages", null, on_success, on_error);
}