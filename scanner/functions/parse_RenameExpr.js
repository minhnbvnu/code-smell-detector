function parse_RenameExpr()
  {
    eventHandler.startNonterminal("RenameExpr", e0);
    shift(218);                     // 'rename'
    lookahead1W(62);                // S^WS | '(:' | 'node'
    shift(191);                     // 'node'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_TargetExpr();
    shift(79);                      // 'as'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_NewNameExpr();
    eventHandler.endNonterminal("RenameExpr", e0);
  }