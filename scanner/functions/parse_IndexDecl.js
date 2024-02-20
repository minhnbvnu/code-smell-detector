function parse_IndexDecl()
  {
    eventHandler.startNonterminal("IndexDecl", e0);
    shift(155);                     // 'index'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_IndexName();
    lookahead1W(65);                // S^WS | '(:' | 'on'
    shift(197);                     // 'on'
    lookahead1W(63);                // S^WS | '(:' | 'nodes'
    shift(192);                     // 'nodes'
    lookahead1W(265);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_IndexDomainExpr();
    shift(87);                      // 'by'
    lookahead1W(265);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_IndexKeySpec();
    for (;;)
    {
      lookahead1W(103);             // S^WS | '(:' | ',' | ';'
      if (l1 != 41)                 // ','
      {
        break;
      }
      shift(41);                    // ','
      lookahead1W(265);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_IndexKeySpec();
    }
    eventHandler.endNonterminal("IndexDecl", e0);
  }