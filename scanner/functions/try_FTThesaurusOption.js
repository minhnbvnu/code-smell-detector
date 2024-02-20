function try_FTThesaurusOption()
  {
    switch (l1)
    {
    case 246:                       // 'thesaurus'
      shiftT(246);                  // 'thesaurus'
      lookahead1W(142);             // S^WS | '(' | '(:' | 'at' | 'default'
      switch (l1)
      {
      case 81:                      // 'at'
        try_FTThesaurusID();
        break;
      case 109:                     // 'default'
        shiftT(109);                // 'default'
        break;
      default:
        shiftT(34);                 // '('
        lookahead1W(112);           // S^WS | '(:' | 'at' | 'default'
        switch (l1)
        {
        case 81:                    // 'at'
          try_FTThesaurusID();
          break;
        default:
          shiftT(109);              // 'default'
        }
        for (;;)
        {
          lookahead1W(101);         // S^WS | '(:' | ')' | ','
          if (l1 != 41)             // ','
          {
            break;
          }
          shiftT(41);               // ','
          lookahead1W(31);          // S^WS | '(:' | 'at'
          try_FTThesaurusID();
        }
        shiftT(37);                 // ')'
      }
      break;
    default:
      shiftT(188);                  // 'no'
      lookahead1W(78);              // S^WS | '(:' | 'thesaurus'
      shiftT(246);                  // 'thesaurus'
    }
  }