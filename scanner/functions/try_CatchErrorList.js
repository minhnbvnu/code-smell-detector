function try_CatchErrorList()
  {
    try_NameTest();
    for (;;)
    {
      lookahead1W(136);             // S^WS | '(:' | '{' | '|'
      if (l1 != 279)                // '|'
      {
        break;
      }
      shiftT(279);                  // '|'
      lookahead1W(256);             // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_NameTest();
    }
  }