function parse_OrderingModeDecl()
  {
    eventHandler.startNonterminal("OrderingModeDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(68);                // S^WS | '(:' | 'ordering'
    shift(203);                     // 'ordering'
    lookahead1W(131);               // S^WS | '(:' | 'ordered' | 'unordered'
    switch (l1)
    {
    case 202:                       // 'ordered'
      shift(202);                   // 'ordered'
      break;
    default:
      shift(256);                   // 'unordered'
    }
    eventHandler.endNonterminal("OrderingModeDecl", e0);
  }