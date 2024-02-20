function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent);
    });
  }