function peg$literalExpectation(text2, ignoreCase) {
    return {
      type: "literal",
      text: text2,
      ignoreCase
    };
  }