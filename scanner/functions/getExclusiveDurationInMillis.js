function getExclusiveDurationInMillis() {
  if (this._exclusiveDuration == null) {
    // Calculate the exclusive time for the subtree rooted at `this`
    const calculator = new ExclusiveCalculator(this)
    calculator.process()
  }
  return this._exclusiveDuration
}