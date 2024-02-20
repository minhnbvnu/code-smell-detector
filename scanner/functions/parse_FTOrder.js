function parse_FTOrder()
  {
    eventHandler.startNonterminal("FTOrder", e0);
    shift(202);                     // 'ordered'
    eventHandler.endNonterminal("FTOrder", e0);
  }