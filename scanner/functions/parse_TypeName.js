function parse_TypeName()
  {
    eventHandler.startNonterminal("TypeName", e0);
    parse_EQName();
    eventHandler.endNonterminal("TypeName", e0);
  }