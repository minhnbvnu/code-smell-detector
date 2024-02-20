function emitChange() {
      callbacks.forEach(c => c());
    }