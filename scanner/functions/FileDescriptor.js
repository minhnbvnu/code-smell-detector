function FileDescriptor(flags) {
  /**
   * Flags.
   * @type {number}
   */
  this._flags = flags;

  /**
   * File system item.
   * @type {Item}
   */
  this._item = null;

  /**
   * Current file position.
   * @type {number}
   */
  this._position = 0;
}