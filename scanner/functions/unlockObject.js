function unlockObject(obj) {
  // unlock parent first, to avoid "cannot be modified" error
  if (obj && obj.typename != "Document") {
    unlockObject(obj.parent);
    obj.locked = false;
  }
}