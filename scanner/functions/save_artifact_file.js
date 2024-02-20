function save_artifact_file(a, file,filename, on_success, on_error, on_progress) {
  load_resource("post", "/spaces/"+a.space_id+"/artifacts/"+a._id+"/payload?filename="+filename,file,on_success,on_error,on_progress);
}