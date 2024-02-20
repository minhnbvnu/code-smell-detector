function parse_ObjectLookup()
  {
    eventHandler.startNonterminal("ObjectLookup", e0);
    shift(45);                      // '.'
    lookahead1W(250);               // StringLiteral | NCName^Token | S^WS | '$' | '$$' | '(' | '(:' | 'after' |
    switch (l1)
    {
    case 11:                        // StringLiteral
      shift(11);                    // StringLiteral
      break;
    case 35:                        // '('
      whitespace();
      parse_ParenthesizedExpr();
      break;
    case 31:                        // '$'
      whitespace();
      parse_VarRef();
      break;
    case 32:                        // '$$'
      whitespace();
      parse_ContextItemExpr();
      break;
    default:
      whitespace();
      parse_NCName();
    }
    eventHandler.endNonterminal("ObjectLookup", e0);
  }