function parse$4() {
    const start = this.tokenStart;
    let value = null;
    const function_name = this.consumeFunctionName();
    if (function_name !== "style") {
      this.error('Unknown container style query identifier; "style" is expected');
    }
    this.skipSC();
    const name2 = this.consume(Ident);
    this.skipSC();
    if (this.tokenType !== RightParenthesis) {
      this.eat(Colon);
      this.skipSC();
      switch (this.tokenType) {
        case Number$1:
          if (this.lookupNonWSType(1) === Delim) {
            value = this.Ratio();
          } else {
            value = this.Number();
          }
          break;
        case Dimension:
          value = this.Dimension();
          break;
        case Function$1:
          value = this.QueryCSSFunction();
          break;
        case Ident:
          value = this.Identifier();
          break;
        default:
          this.error("Number, dimension, ratio, function or identifier is expected");
          break;
      }
      this.skipSC();
    }
    this.eat(RightParenthesis);
    return {
      type: "ContainerFeatureStyle",
      loc: this.getLocation(start, this.tokenStart),
      name: name2,
      value
    };
  }