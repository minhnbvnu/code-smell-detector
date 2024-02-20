function pinSidebar(pin) {
  $('#topbar #close-sidebar').addClass('disabled');
  $('#topbar #close-sidebar').removeClass('fa-rotate-90');
  $('#sidebar').show();
  zoom(true);

  mode.pinnedSidebar = mode.pinnedSidebar || []
  if (mode.pinnedSidebar.indexOf(pin) == -1) {
    mode.pinnedSidebar.push(pin);
  }
}