function disposePopover() {
  if (popover) {
    popover.dispose();
    popover = undefined;
  }
}