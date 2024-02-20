function save_team(u, on_success, on_error) {
  load_resource("put", "/teams/"+u._id,u,on_success,on_error);
}