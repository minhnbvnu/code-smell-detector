function ensureNotTerminated() {
      if (terminated) {
        throw new Error("Worker was terminated");
      }
    }