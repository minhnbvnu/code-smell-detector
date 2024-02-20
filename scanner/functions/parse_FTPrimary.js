function parse_FTPrimary()
  {
    eventHandler.startNonterminal("FTPrimary", e0);
    switch (l1)
    {
    case 34:                        // '('
      shift(34);                    // '('
      lookahead1W(162);             // StringLiteral | S^WS | '(' | '(#' | '(:' | 'ftnot' | '{'
      whitespace();
      parse_FTSelection();
      shift(37);                    // ')'
      break;
    case 35:                        // '(#'
      parse_FTExtensionSelection();
      break;
    default:
      parse_FTWords();
      lookahead1W(215);             // S^WS | EOF | '!=' | '(:' | ')' | ',' | ':' | ';' | '<' | '<<' | '<=' | '=' |
      if (l1 == 195)                // 'occurs'
      {
        whitespace();
        parse_FTTimes();
      }
    }
    eventHandler.endNonterminal("FTPrimary", e0);
  }