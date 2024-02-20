function parse_Separator()
  {
    eventHandler.startNonterminal("Separator", e0);
    shift(53);                      // ';'
    eventHandler.endNonterminal("Separator", e0);
  }