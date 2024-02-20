function save_pdf_file(space, point, file, zones, on_success, on_error, on_progress) {
  load_resource("post", "/spaces/"+space._id+"/artifacts-pdf?filename="+file.name + "&x="+point.x+"&y="+point.y + "&zones="+zones,file,on_success,on_error,on_progress);
}