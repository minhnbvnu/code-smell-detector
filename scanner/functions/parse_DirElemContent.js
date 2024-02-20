function parse_DirElemContent()
  {
    eventHandler.startNonterminal("DirElemContent", e0);
    switch (l1)
    {
    case 54:                        // '<'
    case 55:                        // '<!--'
    case 59:                        // '<?'
      parse_DirectConstructor();
      break;
    case 4:                         // CDataSection
      shift(4);                     // CDataSection
      break;
    case 15:                        // ElementContentChar
      shift(15);                    // ElementContentChar
      break;
    default:
      parse_CommonContent();
    }
    eventHandler.endNonterminal("DirElemContent", e0);
  }