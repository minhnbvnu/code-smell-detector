function findVisible(height) {
    const guess = (oldVisStart + oldVisStop) >> 1
    if (0 === visibility(guess, height)) return findFirst(guess, height)
    else return findBinary(0, all.length, height)
  }