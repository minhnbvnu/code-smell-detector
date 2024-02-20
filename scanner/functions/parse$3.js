function parse$3() {
    const start = this.tokenStart;
    const char1 = this.consume(Delim);
    if (char1 !== "<" && char1 !== ">" && char1 !== "=") {
      this.error("Malformed comparison operator");
    }
    let char2;
    if (this.tokenType === Delim) {
      char2 = this.consume(Delim);
      if (char2 !== "=") {
        this.error("Malformed comparison operator");
      }
    }
    if (this.tokenType === Delim) {
      this.error("Malformed comparison operator");
    }
    const value = char2 ? `${char1}${char2}` : char1;
    return {
      type: "Comparison",
      loc: this.getLocation(start, this.tokenStart),
      value
    };
  }