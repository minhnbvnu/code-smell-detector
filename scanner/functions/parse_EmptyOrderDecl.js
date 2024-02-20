function parse_EmptyOrderDecl()
  {
    eventHandler.startNonterminal("EmptyOrderDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(46);                // S^WS | '(:' | 'default'
    shift(109);                     // 'default'
    lookahead1W(67);                // S^WS | '(:' | 'order'
    shift(201);                     // 'order'
    lookahead1W(49);                // S^WS | '(:' | 'empty'
    shift(123);                     // 'empty'
    lookahead1W(121);               // S^WS | '(:' | 'greatest' | 'least'
    switch (l1)
    {
    case 147:                       // 'greatest'
      shift(147);                   // 'greatest'
      break;
    default:
      shift(173);                   // 'least'
    }
    eventHandler.endNonterminal("EmptyOrderDecl", e0);
  }