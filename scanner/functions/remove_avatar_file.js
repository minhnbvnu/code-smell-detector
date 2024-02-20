function remove_avatar_file(type, o, on_success, on_error) {
  load_resource("delete", "/"+type+"s/"+o._id+"/avatar", null, on_success,on_error);
}