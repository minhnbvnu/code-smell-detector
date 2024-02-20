function confirm_user(user, token, on_success, on_error) {
  load_resource("put", "/users/"+user._id+"/confirm", {token:token}, on_success, on_error);
}