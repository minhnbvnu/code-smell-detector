function parse_LetClause()
  {
    eventHandler.startNonterminal("LetClause", e0);
    shift(174);                     // 'let'
    lookahead1W(96);                // S^WS | '$' | '(:' | 'score'
    whitespace();
    parse_LetBinding();
    for (;;)
    {
      if (l1 != 41)                 // ','
      {
        break;
      }
      shift(41);                    // ','
      lookahead1W(96);              // S^WS | '$' | '(:' | 'score'
      whitespace();
      parse_LetBinding();
    }
    eventHandler.endNonterminal("LetClause", e0);
  }