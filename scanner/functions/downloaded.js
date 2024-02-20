function downloaded(e) {
    if (isCancelled) {
      dispose();
      return;
    }

    actualResolve(e);
    dispose();
  }