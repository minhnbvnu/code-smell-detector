function load_artifacts(id, on_success, on_error) {
  load_resource("get", "/spaces/"+id+"/artifacts", null, on_success, on_error);
}