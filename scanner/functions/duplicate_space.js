function duplicate_space(s, to_space_id, on_success, on_error) {
  var path = "/spaces/"+s._id+"/duplicate";
  if(to_space_id) {
    path += "?parent_space_id=" + to_space_id
  }
  load_resource("post", path, null,on_success,on_error);
}