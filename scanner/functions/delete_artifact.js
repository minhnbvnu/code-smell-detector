function delete_artifact(a, on_success, on_error) {
  load_resource("delete", "/spaces/"+a.space_id+"/artifacts/"+a._id);
}