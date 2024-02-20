function parse_FTMatchOption()
  {
    eventHandler.startNonterminal("FTMatchOption", e0);
    switch (l1)
    {
    case 188:                       // 'no'
      lookahead2W(161);             // S^WS | '(:' | 'stemming' | 'stop' | 'thesaurus' | 'wildcards'
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 169:                       // 'language'
      parse_FTLanguageOption();
      break;
    case 268:                       // 'wildcards'
    case 137404:                    // 'no' 'wildcards'
      parse_FTWildCardOption();
      break;
    case 246:                       // 'thesaurus'
    case 126140:                    // 'no' 'thesaurus'
      parse_FTThesaurusOption();
      break;
    case 238:                       // 'stemming'
    case 122044:                    // 'no' 'stemming'
      parse_FTStemOption();
      break;
    case 114:                       // 'diacritics'
      parse_FTDiacriticsOption();
      break;
    case 239:                       // 'stop'
    case 122556:                    // 'no' 'stop'
      parse_FTStopWordOption();
      break;
    case 199:                       // 'option'
      parse_FTExtensionOption();
      break;
    default:
      parse_FTCaseOption();
    }
    eventHandler.endNonterminal("FTMatchOption", e0);
  }