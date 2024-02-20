function parse_AttributeName()
  {
    eventHandler.startNonterminal("AttributeName", e0);
    parse_EQName();
    eventHandler.endNonterminal("AttributeName", e0);
  }