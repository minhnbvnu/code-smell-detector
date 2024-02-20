function parse$9() {
    const start = this.tokenStart;
    const name2 = this.consumeFunctionName();
    if (!QUERY_CSS_FUNCTIONS.has(name2)) {
      this.error('Unknown query single value function; expected: "calc", "clamp", "max", min"');
    }
    const body = this.Raw(this.tokenIndex, null, false);
    this.eat(RightParenthesis);
    return {
      type: "QueryCSSFunction",
      loc: this.getLocation(start, this.tokenStart),
      name: name2,
      expression: body.value
    };
  }