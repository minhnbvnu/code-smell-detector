function parse_FTThesaurusOption()
  {
    eventHandler.startNonterminal("FTThesaurusOption", e0);
    switch (l1)
    {
    case 246:                       // 'thesaurus'
      shift(246);                   // 'thesaurus'
      lookahead1W(142);             // S^WS | '(' | '(:' | 'at' | 'default'
      switch (l1)
      {
      case 81:                      // 'at'
        whitespace();
        parse_FTThesaurusID();
        break;
      case 109:                     // 'default'
        shift(109);                 // 'default'
        break;
      default:
        shift(34);                  // '('
        lookahead1W(112);           // S^WS | '(:' | 'at' | 'default'
        switch (l1)
        {
        case 81:                    // 'at'
          whitespace();
          parse_FTThesaurusID();
          break;
        default:
          shift(109);               // 'default'
        }
        for (;;)
        {
          lookahead1W(101);         // S^WS | '(:' | ')' | ','
          if (l1 != 41)             // ','
          {
            break;
          }
          shift(41);                // ','
          lookahead1W(31);          // S^WS | '(:' | 'at'
          whitespace();
          parse_FTThesaurusID();
        }
        shift(37);                  // ')'
      }
      break;
    default:
      shift(188);                   // 'no'
      lookahead1W(78);              // S^WS | '(:' | 'thesaurus'
      shift(246);                   // 'thesaurus'
    }
    eventHandler.endNonterminal("FTThesaurusOption", e0);
  }