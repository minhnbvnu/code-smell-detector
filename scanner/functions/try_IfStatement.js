function try_IfStatement()
  {
    shiftT(152);                    // 'if'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Expr();
    shiftT(37);                     // ')'
    lookahead1W(77);                // S^WS | '(:' | 'then'
    shiftT(245);                    // 'then'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Statement();
    lookahead1W(48);                // S^WS | '(:' | 'else'
    shiftT(122);                    // 'else'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Statement();
  }