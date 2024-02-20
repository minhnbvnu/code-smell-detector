function parse_FTScope()
  {
    eventHandler.startNonterminal("FTScope", e0);
    switch (l1)
    {
    case 223:                       // 'same'
      shift(223);                   // 'same'
      break;
    default:
      shift(115);                   // 'different'
    }
    lookahead1W(132);               // S^WS | '(:' | 'paragraph' | 'sentence'
    whitespace();
    parse_FTBigUnit();
    eventHandler.endNonterminal("FTScope", e0);
  }