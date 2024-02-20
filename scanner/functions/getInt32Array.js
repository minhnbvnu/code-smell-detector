function getInt32Array(dracoArray) {
    const numValues = dracoArray.size();
    const intArray = new Int32Array(numValues);
    for (let i2 = 0; i2 < numValues; i2++) {
      intArray[i2] = dracoArray.GetValue(i2);
    }
    return intArray;
  }