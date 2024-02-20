function onDown(e) {
    down = true;
    self.emit('pointerdown', getVector(e, canvas));
  }