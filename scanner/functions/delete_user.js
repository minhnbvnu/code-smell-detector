function delete_user(u, password, on_success, on_error) {
  load_resource("delete", "/users/"+u._id +"?password="+password,null,on_success,on_error);
}