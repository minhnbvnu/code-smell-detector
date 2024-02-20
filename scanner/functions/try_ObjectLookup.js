function try_ObjectLookup()
  {
    shiftT(45);                     // '.'
    lookahead1W(250);               // StringLiteral | NCName^Token | S^WS | '$' | '$$' | '(' | '(:' | 'after' |
    switch (l1)
    {
    case 11:                        // StringLiteral
      shiftT(11);                   // StringLiteral
      break;
    case 35:                        // '('
      try_ParenthesizedExpr();
      break;
    case 31:                        // '$'
      try_VarRef();
      break;
    case 32:                        // '$$'
      try_ContextItemExpr();
      break;
    default:
      try_NCName();
    }
  }