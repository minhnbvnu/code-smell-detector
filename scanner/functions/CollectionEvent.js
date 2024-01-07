constructor(type, element, index) {
    super(type);

    /**
     * The element that is added to or removed from the collection.
     * @type {T}
     * @api
     */
    this.element = element;

    /**
     * The index of the added or removed element.
     * @type {number}
     * @api
     */
    this.index = index;
  }