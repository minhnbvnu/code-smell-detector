function unwrapAll() {
  if (this._wrapped) {
    this.logger.debug('Unwrapping %d items.', this._wrapped.length)
    this._wrapped.forEach(function unwrapEach(wrapped) {
      this.unwrap(wrapped)
    }, this)
  }
}