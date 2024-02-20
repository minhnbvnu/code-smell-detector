function try_DirElemConstructor()
  {
    shiftT(54);                     // '<'
    lookahead1(4);                  // QName
    shiftT(20);                     // QName
    try_DirAttributeList();
    switch (l1)
    {
    case 48:                        // '/>'
      shiftT(48);                   // '/>'
      break;
    default:
      shiftT(61);                   // '>'
      for (;;)
      {
        lookahead1(174);            // CDataSection | PredefinedEntityRef | ElementContentChar | CharRef | '<' |
        if (l1 == 56)               // '</'
        {
          break;
        }
        try_DirElemContent();
      }
      shiftT(56);                   // '</'
      lookahead1(4);                // QName
      shiftT(20);                   // QName
      lookahead1(12);               // S | '>'
      if (l1 == 21)                 // S
      {
        shiftT(21);                 // S
      }
      lookahead1(8);                // '>'
      shiftT(61);                   // '>'
    }
  }