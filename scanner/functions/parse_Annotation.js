function parse_Annotation()
  {
    eventHandler.startNonterminal("Annotation", e0);
    shift(32);                      // '%'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_EQName();
    lookahead1W(171);               // S^WS | '%' | '(' | '(:' | 'collection' | 'function' | 'index' | 'integrity' |
    if (l1 == 34)                   // '('
    {
      shift(34);                    // '('
      lookahead1W(154);             // IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral | S^WS | '(:'
      whitespace();
      parse_Literal();
      for (;;)
      {
        lookahead1W(101);           // S^WS | '(:' | ')' | ','
        if (l1 != 41)               // ','
        {
          break;
        }
        shift(41);                  // ','
        lookahead1W(154);           // IntegerLiteral | DecimalLiteral | DoubleLiteral | StringLiteral | S^WS | '(:'
        whitespace();
        parse_Literal();
      }
      shift(37);                    // ')'
    }
    eventHandler.endNonterminal("Annotation", e0);
  }