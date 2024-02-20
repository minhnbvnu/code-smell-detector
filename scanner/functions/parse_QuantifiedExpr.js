function parse_QuantifiedExpr()
  {
    eventHandler.startNonterminal("QuantifiedExpr", e0);
    switch (l1)
    {
    case 235:                       // 'some'
      shift(235);                   // 'some'
      break;
    default:
      shift(129);                   // 'every'
    }
    lookahead1W(21);                // S^WS | '$' | '(:'
    whitespace();
    parse_QuantifiedVarDecl();
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shift(41);                    // ','
      lookahead1W(21);              // S^WS | '$' | '(:'
      whitespace();
      parse_QuantifiedVarDecl();
    }
    shift(224);                     // 'satisfies'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("QuantifiedExpr", e0);
  }