function delete_space(s, on_success, on_error) {
  load_resource("delete", "/spaces/"+s._id, null, on_success, on_error);
}