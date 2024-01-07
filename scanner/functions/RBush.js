constructor(maxEntries) {
    /**
     * @private
     */
    this.rbush_ = new RBush_(maxEntries);

    /**
     * A mapping between the objects added to this rbush wrapper
     * and the objects that are actually added to the internal rbush.
     * @private
     * @type {Object<string, Entry>}
     */
    this.items_ = {};
  }