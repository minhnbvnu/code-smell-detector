function escapeKeyHandler() {
  // If editing is currently performed, don't do anything.
  if (signonsTree.getAttribute("editing")) {
    return;
  }
  window.close();
}