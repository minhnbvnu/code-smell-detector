function restoreDocumentState() {
  var i;
  for (i = 0; i<textFramesToUnhide.length; i++) {
    textFramesToUnhide[i].hidden = false;
  }
  for (i = objectsToRelock.length-1; i>=0; i--) {
    objectsToRelock[i].locked = true;
  }
}