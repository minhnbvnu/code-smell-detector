function parse_ApplyStatement()
  {
    eventHandler.startNonterminal("ApplyStatement", e0);
    parse_ExprSimple();
    shift(53);                      // ';'
    eventHandler.endNonterminal("ApplyStatement", e0);
  }