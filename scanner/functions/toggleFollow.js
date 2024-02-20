function toggleFollow()
{
  mode.follow = ! mode.follow;

  if(mode.follow) {
    $("#followMode").addClass('fa-check-circle');
    $("#followMode").removeClass('fa-ban');
    getPosition();
  } else {
    $("#followMode").addClass('fa-ban');
    $("#followMode").removeClass('fa-check-circle');
  }
  showFooter();
}