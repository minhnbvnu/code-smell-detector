function writeNum() {
    const count = numSame.toString();
    const countSize = count.length;

    if ((index + countSize + 1) > toCompress.length) {
      return false;
    }

    for (let i = 0; i < countSize; i++) {
      result[index + i] = count[i];
    }
    return true;
  }