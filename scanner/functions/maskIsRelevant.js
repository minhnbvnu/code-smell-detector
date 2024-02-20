function maskIsRelevant(mask) {
  var parent = mask.parent;
  if (parent.typename == "GroupItem") {
    if (parent.textFrames.length === 0) {
      return false;
    }
  }
  return true;
}