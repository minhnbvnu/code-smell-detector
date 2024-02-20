function save_artifact(a, on_success, on_error) {
  if (a._id) {
    load_resource("put", "/spaces/"+a.space_id+"/artifacts/"+a._id,a,on_success,on_error);
  } else {
    load_resource("post", "/spaces/"+a.space_id+"/artifacts",a,on_success,on_error);
  }
}