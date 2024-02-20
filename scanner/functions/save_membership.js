function save_membership(space, m, on_success, on_error) {
  load_resource("put", "/spaces/"+ space._id +"/memberships/" + m._id, m, on_success, on_error);
}