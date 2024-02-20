function try_DirAttributeList()
  {
    for (;;)
    {
      lookahead1(19);               // S | '/>' | '>'
      if (l1 != 21)                 // S
      {
        break;
      }
      shiftT(21);                   // S
      lookahead1(91);               // QName | S | '/>' | '>'
      if (l1 == 20)                 // QName
      {
        shiftT(20);                 // QName
        lookahead1(11);             // S | '='
        if (l1 == 21)               // S
        {
          shiftT(21);               // S
        }
        lookahead1(7);              // '='
        shiftT(60);                 // '='
        lookahead1(18);             // S | '"' | "'"
        if (l1 == 21)               // S
        {
          shiftT(21);               // S
        }
        try_DirAttributeValue();
      }
    }
  }