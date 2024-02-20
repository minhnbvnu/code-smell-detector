function try_FTMatchOption()
  {
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
      try_FTLanguageOption();
      break;
    case 268:                       // 'wildcards'
    case 137404:                    // 'no' 'wildcards'
      try_FTWildCardOption();
      break;
    case 246:                       // 'thesaurus'
    case 126140:                    // 'no' 'thesaurus'
      try_FTThesaurusOption();
      break;
    case 238:                       // 'stemming'
    case 122044:                    // 'no' 'stemming'
      try_FTStemOption();
      break;
    case 114:                       // 'diacritics'
      try_FTDiacriticsOption();
      break;
    case 239:                       // 'stop'
    case 122556:                    // 'no' 'stop'
      try_FTStopWordOption();
      break;
    case 199:                       // 'option'
      try_FTExtensionOption();
      break;
    default:
      try_FTCaseOption();
    }
  }