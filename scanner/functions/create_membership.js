function create_membership(space, m, on_success, on_error) {
  load_resource("post", "/spaces/"+ space._id +"/memberships", m, on_success, on_error);
}