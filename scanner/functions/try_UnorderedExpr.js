function try_UnorderedExpr()
  {
    shiftT(256);                    // 'unordered'
    lookahead1W(87);                // S^WS | '(:' | '{'
    shiftT(276);                    // '{'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Expr();
    shiftT(282);                    // '}'
  }