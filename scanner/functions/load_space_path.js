function load_space_path(id, on_success, on_error) {
  var url = "/spaces/"+id+"/path";
  load_resource("get", url, null, function(space, req) {
    on_success(space);
  }, on_error);
}