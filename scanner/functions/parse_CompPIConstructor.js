function parse_CompPIConstructor()
  {
    eventHandler.startNonterminal("CompPIConstructor", e0);
    shift(216);                     // 'processing-instruction'
    lookahead1W(250);               // NCName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    switch (l1)
    {
    case 276:                       // '{'
      shift(276);                   // '{'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_Expr();
      shift(282);                   // '}'
      break;
    default:
      whitespace();
      parse_NCName();
    }
    lookahead1W(87);                // S^WS | '(:' | '{'
    switch (l1)
    {
    case 276:                       // '{'
      lookahead2W(276);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      break;
    default:
      lk = l1;
    }
    if (lk == 144660)               // '{' '}'
    {
      lk = memoized(13, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2;
        try
        {
          shiftT(276);              // '{'
          lookahead1W(88);          // S^WS | '(:' | '}'
          shiftT(282);              // '}'
          lk = -1;
        }
        catch (p1A)
        {
          lk = -2;
        }
        b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
        b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
        b2 = b2A; e2 = e2A; end = e2A; }}
        memoize(13, e0, lk);
      }
    }
    switch (lk)
    {
    case -1:
      shift(276);                   // '{'
      lookahead1W(88);              // S^WS | '(:' | '}'
      shift(282);                   // '}'
      break;
    default:
      whitespace();
      parse_BlockExpr();
    }
    eventHandler.endNonterminal("CompPIConstructor", e0);
  }