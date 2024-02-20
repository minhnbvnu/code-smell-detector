function save_avatar_file(type, o, file, on_success, on_error) {
  load_resource("post", "/"+type+"s/"+o._id+"/avatar", file, on_success,on_error);
}