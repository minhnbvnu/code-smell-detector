function parse_ValueExpr()
  {
    eventHandler.startNonterminal("ValueExpr", e0);
    switch (l1)
    {
    case 260:                       // 'validate'
      lookahead2W(247);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' |
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 87812:                     // 'validate' 'lax'
    case 123140:                    // 'validate' 'strict'
    case 129284:                    // 'validate' 'type'
    case 141572:                    // 'validate' '{'
      parse_ValidateExpr();
      break;
    case 35:                        // '(#'
      parse_ExtensionExpr();
      break;
    default:
      parse_SimpleMapExpr();
    }
    eventHandler.endNonterminal("ValueExpr", e0);
  }