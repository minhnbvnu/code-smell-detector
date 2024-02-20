function parse_PITest()
  {
    eventHandler.startNonterminal("PITest", e0);
    shift(216);                     // 'processing-instruction'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(252);               // StringLiteral | NCName^Token | S^WS | '(:' | ')' | 'after' | 'allowing' |
    if (l1 != 37)                   // ')'
    {
      switch (l1)
      {
      case 11:                      // StringLiteral
        shift(11);                  // StringLiteral
        break;
      default:
        whitespace();
        parse_NCName();
      }
    }
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("PITest", e0);
  }