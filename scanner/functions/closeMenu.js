function closeMenu(force) {
  if(! menuTourRunning || force ) {
    $('#feedbackSidebar, #sidebarExit').hide();
    toggleKeybinding('on');
  }
}