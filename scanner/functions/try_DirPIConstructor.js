function try_DirPIConstructor()
  {
    shiftT(59);                     // '<?'
    lookahead1(3);                  // PITarget
    shiftT(18);                     // PITarget
    lookahead1(13);                 // S | '?>'
    if (l1 == 21)                   // S
    {
      shiftT(21);                   // S
      lookahead1(2);                // DirPIContents
      shiftT(3);                    // DirPIContents
    }
    lookahead1(9);                  // '?>'
    shiftT(65);                     // '?>'
  }