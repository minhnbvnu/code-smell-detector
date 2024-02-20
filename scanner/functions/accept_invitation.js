function accept_invitation(id, code, on_success, on_error) {
  load_resource("get", "/memberships/"+ id +"/accept?code="+code, null, on_success, on_error);
}