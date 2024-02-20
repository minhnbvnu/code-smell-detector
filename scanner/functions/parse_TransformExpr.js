function parse_TransformExpr()
  {
    eventHandler.startNonterminal("TransformExpr", e0);
    shift(103);                     // 'copy'
    lookahead1W(21);                // S^WS | '$' | '(:'
    whitespace();
    parse_TransformSpec();
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shift(41);                    // ','
      lookahead1W(21);              // S^WS | '$' | '(:'
      whitespace();
      parse_TransformSpec();
    }
    shift(181);                     // 'modify'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    shift(220);                     // 'return'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("TransformExpr", e0);
  }