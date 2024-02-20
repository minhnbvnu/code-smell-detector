function literalValue(value) {
      if (value instanceof LiteralString) {
        return /** @type {!LiteralString} */(value).value;
      } else {
        throw new Error(`non-literal value passed to Polymer.htmlLiteral: ${value}`);
      }
    }