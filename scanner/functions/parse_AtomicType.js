function parse_AtomicType()
  {
    eventHandler.startNonterminal("AtomicType", e0);
    parse_EQName();
    eventHandler.endNonterminal("AtomicType", e0);
  }