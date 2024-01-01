function recycle (obj) {
    if (!(obj instanceof Object)) { return; }
    if (nextFreeSlot === null || nextFreeSlot === -1) {
      objPool[objPool.length] = obj;
      return;
    }
    objPool[--nextFreeSlot] = obj;
  }