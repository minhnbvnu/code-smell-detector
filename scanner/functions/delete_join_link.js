function delete_join_link(link_id, on_success, on_error) {
  load_resource("delete", "/invitation_codes/"+link_id, null, on_success, on_error);
}