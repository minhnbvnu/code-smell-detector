function parse_CurrentItem()
  {
    eventHandler.startNonterminal("CurrentItem", e0);
    parse_EQName();
    eventHandler.endNonterminal("CurrentItem", e0);
  }