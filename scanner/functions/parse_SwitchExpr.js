function parse_SwitchExpr()
  {
    eventHandler.startNonterminal("SwitchExpr", e0);
    shift(243);                     // 'switch'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(37);                      // ')'
    for (;;)
    {
      lookahead1W(35);              // S^WS | '(:' | 'case'
      whitespace();
      parse_SwitchCaseClause();
      if (l1 != 88)                 // 'case'
      {
        break;
      }
    }
    shift(109);                     // 'default'
    lookahead1W(70);                // S^WS | '(:' | 'return'
    shift(220);                     // 'return'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("SwitchExpr", e0);
  }