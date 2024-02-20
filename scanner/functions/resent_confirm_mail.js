function resent_confirm_mail(user, on_success, on_error) {
  load_resource("post", "/users/"+user._id+"/confirm", {}, on_success, on_error);
}