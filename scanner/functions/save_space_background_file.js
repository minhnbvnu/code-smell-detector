function save_space_background_file(space, file, on_success, on_error) {
  load_resource("post", "/spaces/"+space._id+"/background?filename="+file.name, file, on_success,on_error);
}