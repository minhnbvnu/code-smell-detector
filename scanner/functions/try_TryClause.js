function try_TryClause()
  {
    shiftT(250);                    // 'try'
    lookahead1W(87);                // S^WS | '(:' | '{'
    shiftT(276);                    // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_TryTargetExpr();
    shiftT(282);                    // '}'
  }