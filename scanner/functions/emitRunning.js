function emitRunning() {
    s.emit('running', commit);
    setImmediate(emitOne);
  }