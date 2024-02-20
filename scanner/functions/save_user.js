function save_user(u, on_success, on_error) {
  load_resource("put", "/users/"+u._id,u,on_success,on_error);
}