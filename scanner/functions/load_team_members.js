function load_team_members(id, on_success, on_error) {
  load_resource("get", "/teams/"+ id +"/memberships", null, function(team) {
    on_success(team);
  }, on_error);
}