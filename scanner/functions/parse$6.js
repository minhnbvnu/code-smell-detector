function parse$6() {
    const children = this.createList();
    let child = null;
    this.skipSC();
    scan:
      while (!this.eof) {
        switch (this.tokenType) {
          case Comment:
          case WhiteSpace:
            this.next();
            continue;
          case Ident:
            child = this.Identifier();
            break;
          case LeftParenthesis:
            child = lookahead_is_range.call(this) ? this.QueryFeatureRange() : this.QueryFeature();
            break;
          default:
            break scan;
        }
        children.push(child);
      }
    if (child === null) {
      this.error("Identifier or parenthesis is expected");
    }
    return {
      type: "MediaQuery",
      loc: this.getLocationFromList(children),
      children
    };
  }