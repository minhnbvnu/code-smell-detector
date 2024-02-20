function notifyRejectionHandled(promise) {
    global.process.emit('rejectionHandled', promise);
  }