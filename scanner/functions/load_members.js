function load_members(space, on_success, on_error) {
  load_resource("get", "/spaces/"+ space._id +"/memberships", null, on_success, on_error);
}