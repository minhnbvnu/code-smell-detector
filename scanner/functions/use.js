function use () {
    var objToUse;
    if (nextFreeSlot === null || nextFreeSlot === objPool.length) {
      grow(objPool.length || 5);
    }
    objToUse = objPool[nextFreeSlot];
    objPool[nextFreeSlot++] = EMPTY_SLOT;
    clearObject(objToUse);
    return objToUse;
  }