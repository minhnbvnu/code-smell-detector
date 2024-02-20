function try_EmptyOrderDecl()
  {
    shiftT(108);                    // 'declare'
    lookahead1W(46);                // S^WS | '(:' | 'default'
    shiftT(109);                    // 'default'
    lookahead1W(67);                // S^WS | '(:' | 'order'
    shiftT(201);                    // 'order'
    lookahead1W(49);                // S^WS | '(:' | 'empty'
    shiftT(123);                    // 'empty'
    lookahead1W(121);               // S^WS | '(:' | 'greatest' | 'least'
    switch (l1)
    {
    case 147:                       // 'greatest'
      shiftT(147);                  // 'greatest'
      break;
    default:
      shiftT(173);                  // 'least'
    }
  }