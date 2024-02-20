function delete_comment(space_id, message_id,on_success, on_error) {
  load_resource("delete", "/spaces/"+space_id +"/messages/"+ message_id, null , on_success, on_error);
}