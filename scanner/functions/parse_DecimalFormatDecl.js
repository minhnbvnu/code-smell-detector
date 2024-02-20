function parse_DecimalFormatDecl()
  {
    eventHandler.startNonterminal("DecimalFormatDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(114);               // S^WS | '(:' | 'decimal-format' | 'default'
    switch (l1)
    {
    case 106:                       // 'decimal-format'
      shift(106);                   // 'decimal-format'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_EQName();
      break;
    default:
      shift(109);                   // 'default'
      lookahead1W(45);              // S^WS | '(:' | 'decimal-format'
      shift(106);                   // 'decimal-format'
    }
    for (;;)
    {
      lookahead1W(180);             // S^WS | '(:' | ';' | 'NaN' | 'decimal-separator' | 'digit' |
      if (l1 == 53)                 // ';'
      {
        break;
      }
      whitespace();
      parse_DFPropertyName();
      lookahead1W(29);              // S^WS | '(:' | '='
      shift(60);                    // '='
      lookahead1W(17);              // StringLiteral | S^WS | '(:'
      shift(11);                    // StringLiteral
    }
    eventHandler.endNonterminal("DecimalFormatDecl", e0);
  }