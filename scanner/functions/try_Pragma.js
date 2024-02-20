function try_Pragma()
  {
    shiftT(35);                     // '(#'
    lookahead1(251);                // EQName^Token | S | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
    if (l1 == 21)                   // S
    {
      shiftT(21);                   // S
    }
    try_EQName();
    lookahead1(10);                 // S | '#)'
    if (l1 == 21)                   // S
    {
      shiftT(21);                   // S
      lookahead1(0);                // PragmaContents
      shiftT(1);                    // PragmaContents
    }
    lookahead1(5);                  // '#)'
    shiftT(30);                     // '#)'
  }