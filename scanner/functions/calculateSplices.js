function calculateSplices(current, previous) {
    return calcSplices(current, 0, current.length, previous, 0,
                            previous.length);
  }