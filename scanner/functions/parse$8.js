function parse$8() {
    const start = this.tokenStart;
    const children = this.createList();
    let child = null;
    this.eat(LeftParenthesis);
    this.skipSC();
    while (!this.eof && this.tokenType !== RightParenthesis) {
      switch (this.tokenType) {
        case Number$1:
          if (lookup_non_WS_type_and_value.call(this, 1, Delim, "/")) {
            child = this.Ratio();
          } else {
            child = this.Number();
          }
          break;
        case Delim:
          child = this.Comparison();
          break;
        case Dimension:
          child = this.Dimension();
          break;
        case Function$1:
          child = this.QueryCSSFunction();
          break;
        case Ident:
          child = this.Identifier();
          break;
        default:
          this.error("Number, dimension, comparison, ratio, function, or identifier is expected");
          break;
      }
      children.push(child);
      this.skipSC();
    }
    this.eat(RightParenthesis);
    return {
      type: "QueryFeatureRange",
      loc: this.getLocation(start, this.tokenStart),
      children
    };
  }