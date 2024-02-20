function parse_ArgumentPlaceholder()
  {
    eventHandler.startNonterminal("ArgumentPlaceholder", e0);
    shift(64);                      // '?'
    eventHandler.endNonterminal("ArgumentPlaceholder", e0);
  }