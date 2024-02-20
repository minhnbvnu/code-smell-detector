function parse_VoidStatement()
  {
    eventHandler.startNonterminal("VoidStatement", e0);
    shift(53);                      // ';'
    eventHandler.endNonterminal("VoidStatement", e0);
  }