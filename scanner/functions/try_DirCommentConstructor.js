function try_DirCommentConstructor()
  {
    shiftT(55);                     // '<!--'
    lookahead1(1);                  // DirCommentContents
    shiftT(2);                      // DirCommentContents
    lookahead1(6);                  // '-->'
    shiftT(43);                     // '-->'
  }