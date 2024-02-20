function unpinSidebar(pin) {
  if (Array.isArray(mode.pinnedSidebar)) {
    mode.pinnedSidebar = mode.pinnedSidebar.filter(function(item) {
      return item !== pin;
    });

    if(mode.pinnedSidebar.length == 0) {
      $('#topbar #close-sidebar').removeClass('disabled');
      delete mode.pinnedSidebar;
    }
  }
}