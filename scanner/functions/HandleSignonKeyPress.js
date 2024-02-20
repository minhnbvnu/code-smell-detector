function HandleSignonKeyPress(e) {
  // If editing is currently performed, don't do anything.
  if (signonsTree.getAttribute("editing")) {
    return;
  }
  if (
    e.keyCode == KeyboardEvent.DOM_VK_DELETE ||
    (AppConstants.platform == "macosx" &&
      e.keyCode == KeyboardEvent.DOM_VK_BACK_SPACE)
  ) {
    DeleteSignon();
    e.preventDefault();
  }
}