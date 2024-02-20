function parse_DirCommentConstructor()
  {
    eventHandler.startNonterminal("DirCommentConstructor", e0);
    shift(55);                      // '<!--'
    lookahead1(1);                  // DirCommentContents
    shift(2);                       // DirCommentContents
    lookahead1(6);                  // '-->'
    shift(43);                      // '-->'
    eventHandler.endNonterminal("DirCommentConstructor", e0);
  }