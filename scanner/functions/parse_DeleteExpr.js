function parse_DeleteExpr()
  {
    eventHandler.startNonterminal("DeleteExpr", e0);
    shift(110);                     // 'delete'
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
    parse_TargetExpr();
    eventHandler.endNonterminal("DeleteExpr", e0);
  }