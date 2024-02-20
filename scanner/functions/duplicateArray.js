function duplicateArray(array) {
    return array.clone ? array.clone() : new Array(array.length);
  }