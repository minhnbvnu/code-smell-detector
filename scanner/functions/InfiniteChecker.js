function InfiniteChecker(maxIterations){
  if (this instanceof InfiniteChecker){
    this.maxIterations = maxIterations
    this.count = 0
  } else {
    return new InfiniteChecker(maxIterations)
  }
}