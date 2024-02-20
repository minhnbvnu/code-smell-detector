function buildLabelStatement(prefix, key = "label") {
  return function (node) {
    this.word(prefix);
    const label = node[key];

    if (label) {
      this.space();
      const isLabel = key == "label";
      const terminatorState = this.startTerminatorless(isLabel);
      this.print(label, node);
      this.endTerminatorless(terminatorState);
    }

    this.semicolon();
  };
}