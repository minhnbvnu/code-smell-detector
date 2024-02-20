function assignOriginal(wrapped, original, forceOrig) {
  wrapped[symbols.wrapped] = this.id
  if (!wrapped[symbols.original] || forceOrig) {
    wrapped[symbols.original] = original
  }
}