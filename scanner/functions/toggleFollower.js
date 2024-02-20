function toggleFollower()
{
  mode.follow = $("#remoteToggle").prop("checked");
  getPosition();
}