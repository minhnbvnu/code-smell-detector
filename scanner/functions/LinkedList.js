constructor(circular) {
    /**
     * @private
     * @type {Item|undefined}
     */
    this.first_;

    /**
     * @private
     * @type {Item|undefined}
     */
    this.last_;

    /**
     * @private
     * @type {Item|undefined}
     */
    this.head_;

    /**
     * @private
     * @type {boolean}
     */
    this.circular_ = circular === undefined ? true : circular;

    /**
     * @private
     * @type {number}
     */
    this.length_ = 0;
  }