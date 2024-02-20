function save_comment(space_id, data, on_success, on_error) {
  load_resource("post", "/spaces/"+space_id +"/messages", data, on_success, on_error);
}