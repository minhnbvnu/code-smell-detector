function objectIsLocked(obj) {
  while (obj && obj.typename != "Document") {
    if (obj.locked) {
      return true;
    }
    obj = obj.parent;
  }
  return false;
}