constructor(tagName, conditions) {
    super(tagName);

    /**
     * @type {Array<import("./Filter.js").default>}
     */
    this.conditions = conditions;
    assert(this.conditions.length >= 2, 'At least 2 conditions are required');
  }