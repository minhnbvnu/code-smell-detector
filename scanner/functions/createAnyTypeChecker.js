function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction.thatReturns(null));
}