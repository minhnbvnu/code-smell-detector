function parse$5() {
    const start = this.tokenStart;
    const children = this.createList();
    let child = null;
    let name2 = null;
    if (this.tokenType === Ident) {
      const container_name = this.substring(this.tokenStart, this.tokenEnd);
      if (!CONTAINER_QUERY_KEYWORDS.has(container_name.toLowerCase())) {
        name2 = container_name;
        this.eatIdent(container_name);
      }
    }
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
          case Function$1:
            child = this.ContainerFeatureStyle();
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
      type: "ContainerQuery",
      loc: this.getLocation(start, this.tokenStart - 1),
      name: name2,
      children
    };
  }