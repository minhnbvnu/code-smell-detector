function create_join_link(space_id, role, on_success, on_error) {
  load_resource("post", "/invitation_codes", {join_role:role, sticky:true, space_id:space_id}, on_success, on_error);
}