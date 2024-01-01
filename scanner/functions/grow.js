function grow (count) {
    var currentLength;
    var i;

    count = count === undefined ? objPool.length : count;
    if (count > 0 && nextFreeSlot == null) {
      nextFreeSlot = 0;
    }

    if (count > 0) {
      currentLength = objPool.length;
      objPool.length += Number(count);
      for (i = currentLength; i < objPool.length; i++) {
        // Add new obj to pool.
        objPool[i] = objectFactory();
      }
    }

    return objPool.length;
  }