constructor(marker, languageMode, grammar, depth) {
    this.marker = marker;
    this.languageMode = languageMode;
    this.grammar = grammar;
    this.tree = null;
    this.currentParsePromise = null;
    this.patchSinceCurrentParseStarted = null;
    this.depth = depth;
  }