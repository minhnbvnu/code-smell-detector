function parse_InsertExpr()
  {
    eventHandler.startNonterminal("InsertExpr", e0);
    shift(159);                     // 'insert'
    lookahead1W(129);               // S^WS | '(:' | 'node' | 'nodes'
    switch (l1)
    {
    case 191:                       // 'node'
      shift(191);                   // 'node'
      break;
    default:
      shift(192);                   // 'nodes'
    }
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_SourceExpr();
    whitespace();
    parse_InsertExprTargetChoice();
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_TargetExpr();
    eventHandler.endNonterminal("InsertExpr", e0);
  }