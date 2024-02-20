function parse_DirPIConstructor()
  {
    eventHandler.startNonterminal("DirPIConstructor", e0);
    shift(59);                      // '<?'
    lookahead1(3);                  // PITarget
    shift(18);                      // PITarget
    lookahead1(13);                 // S | '?>'
    if (l1 == 21)                   // S
    {
      shift(21);                    // S
      lookahead1(2);                // DirPIContents
      shift(3);                     // DirPIContents
    }
    lookahead1(9);                  // '?>'
    shift(65);                      // '?>'
    eventHandler.endNonterminal("DirPIConstructor", e0);
  }