function get_join_link(space_id, on_success, on_error) {
  load_resource("get", "/invitation_codes?space_id="+space_id, null, on_success, on_error);
}