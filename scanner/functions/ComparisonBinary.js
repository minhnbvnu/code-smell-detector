constructor(tagName, propertyName, expression, matchCase) {
    super(tagName, propertyName);

    /**
     * @type {!(string|number)}
     */
    this.expression = expression;

    /**
     * @type {boolean|undefined}
     */
    this.matchCase = matchCase;
  }