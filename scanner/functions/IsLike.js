constructor(
    propertyName,
    pattern,
    wildCard,
    singleChar,
    escapeChar,
    matchCase,
  ) {
    super('PropertyIsLike', propertyName);

    /**
     * @type {!string}
     */
    this.pattern = pattern;

    /**
     * @type {!string}
     */
    this.wildCard = wildCard !== undefined ? wildCard : '*';

    /**
     * @type {!string}
     */
    this.singleChar = singleChar !== undefined ? singleChar : '.';

    /**
     * @type {!string}
     */
    this.escapeChar = escapeChar !== undefined ? escapeChar : '!';

    /**
     * @type {boolean|undefined}
     */
    this.matchCase = matchCase;
  }