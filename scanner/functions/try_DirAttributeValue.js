function try_DirAttributeValue()
  {
    lookahead1(14);                 // '"' | "'"
    switch (l1)
    {
    case 28:                        // '"'
      shiftT(28);                   // '"'
      for (;;)
      {
        lookahead1(167);            // PredefinedEntityRef | EscapeQuot | QuotAttrContentChar | CharRef | '"' | '{' |
        if (l1 == 28)               // '"'
        {
          break;
        }
        switch (l1)
        {
        case 13:                    // EscapeQuot
          shiftT(13);               // EscapeQuot
          break;
        default:
          try_QuotAttrValueContent();
        }
      }
      shiftT(28);                   // '"'
      break;
    default:
      shiftT(33);                   // "'"
      for (;;)
      {
        lookahead1(168);            // PredefinedEntityRef | EscapeApos | AposAttrContentChar | CharRef | "'" | '{' |
        if (l1 == 33)               // "'"
        {
          break;
        }
        switch (l1)
        {
        case 14:                    // EscapeApos
          shiftT(14);               // EscapeApos
          break;
        default:
          try_AposAttrValueContent();
        }
      }
      shiftT(33);                   // "'"
    }
  }