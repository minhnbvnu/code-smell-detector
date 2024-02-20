function toggleComplete() {
  if($(this).is(':checked')) {
    activityIncomplete = false;
    sendActivityStatus(true);
    if(mode.follow) {
      getPosition();
    }
  }
  else {
    activityIncomplete = true;
    sendActivityStatus(false);
  }
}