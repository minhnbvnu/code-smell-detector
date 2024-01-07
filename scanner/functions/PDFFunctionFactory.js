constructor({
    xref,
    isEvalSupported = true
  }) {
    this.xref = xref;
    this.isEvalSupported = isEvalSupported !== false;
  }