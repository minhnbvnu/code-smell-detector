function update_comment(space_id, data, on_success, on_error) {
  load_resource("post", "/spaces/"+space_id+"/messages/" + data._id , data, on_success, on_error);
}