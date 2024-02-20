function openBlock(disableTracking = false) {
    blockStack.push(currentBlock = disableTracking ? null : []);
  }