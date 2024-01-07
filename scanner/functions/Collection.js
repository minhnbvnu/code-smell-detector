constructor(array, options) {
    super();

    /***
     * @type {CollectionOnSignature<T, import("./events").EventsKey>}
     */
    this.on;

    /***
     * @type {CollectionOnSignature<T, import("./events").EventsKey>}
     */
    this.once;

    /***
     * @type {CollectionOnSignature<T, void>}
     */
    this.un;

    options = options || {};

    /**
     * @private
     * @type {boolean}
     */
    this.unique_ = !!options.unique;

    /**
     * @private
     * @type {!Array<T>}
     */
    this.array_ = array ? array : [];

    if (this.unique_) {
      for (let i = 0, ii = this.array_.length; i < ii; ++i) {
        this.assertUnique_(this.array_[i], i);
      }
    }

    this.updateLength_();
  }