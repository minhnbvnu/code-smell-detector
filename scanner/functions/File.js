function File() {
  Item.call(this);

  /**
   * File content.
   * @type {Buffer}
   */
  this._content = EMPTY;
}