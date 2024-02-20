function findBinary(begin, count, height) {
    const middle = begin + (count >> 1)
    if (count <= 0) return null
    switch (visibility(middle, height)) {
      case 1:
        return findBinary(begin, count >> 1, height)
      case 0:
        return findFirst(middle, height)
      default:
        return findBinary(middle + 1, count - 1 - (count >> 1), height)
    }
  }