function save_user_background_file(user, file, on_success, on_error) {
  load_resource("post", "/users/"+user._id+"/background", file, on_success,on_error);
}