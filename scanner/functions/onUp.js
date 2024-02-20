function onUp(e) {
    if (!down) return;
    self.emit('pointerup', getVector(e, canvas));
  }