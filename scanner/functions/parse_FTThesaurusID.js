function parse_FTThesaurusID()
  {
    eventHandler.startNonterminal("FTThesaurusID", e0);
    shift(81);                      // 'at'
    lookahead1W(15);                // URILiteral | S^WS | '(:'
    shift(7);                       // URILiteral
    lookahead1W(220);               // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
    if (l1 == 217)                  // 'relationship'
    {
      shift(217);                   // 'relationship'
      lookahead1W(17);              // StringLiteral | S^WS | '(:'
      shift(11);                    // StringLiteral
    }
    lookahead1W(216);               // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
    switch (l1)
    {
    case 81:                        // 'at'
      lookahead2W(165);             // S^WS | '(:' | 'end' | 'least' | 'most' | 'position' | 'start'
      break;
    default:
      lk = l1;
    }
    if (lk == 130                   // 'exactly'
     || lk == 140                   // 'from'
     || lk == 88657                 // 'at' 'least'
     || lk == 93777)                // 'at' 'most'
    {
      whitespace();
      parse_FTLiteralRange();
      lookahead1W(58);              // S^WS | '(:' | 'levels'
      shift(175);                   // 'levels'
    }
    eventHandler.endNonterminal("FTThesaurusID", e0);
  }