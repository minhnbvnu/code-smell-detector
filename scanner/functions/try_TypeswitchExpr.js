function try_TypeswitchExpr()
  {
    shiftT(253);                    // 'typeswitch'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_Expr();
    shiftT(37);                     // ')'
    for (;;)
    {
      lookahead1W(35);              // S^WS | '(:' | 'case'
      try_CaseClause();
      if (l1 != 88)                 // 'case'
      {
        break;
      }
    }
    shiftT(109);                    // 'default'
    lookahead1W(95);                // S^WS | '$' | '(:' | 'return'
    if (l1 == 31)                   // '$'
    {
      shiftT(31);                   // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_VarName();
    }
    lookahead1W(70);                // S^WS | '(:' | 'return'
    shiftT(220);                    // 'return'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    try_ExprSingle();
  }