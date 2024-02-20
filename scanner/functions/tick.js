function tick() {
    doneCount++;
    if ( doneCount == count ) {
      onComplete();
    }
  }