function parse_AtomicOrUnionType()
  {
    eventHandler.startNonterminal("AtomicOrUnionType", e0);
    parse_EQName();
    eventHandler.endNonterminal("AtomicOrUnionType", e0);
  }