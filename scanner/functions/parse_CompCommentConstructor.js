function parse_CompCommentConstructor()
  {
    eventHandler.startNonterminal("CompCommentConstructor", e0);
    shift(96);                      // 'comment'
    lookahead1W(87);                // S^WS | '(:' | '{'
    whitespace();
    parse_BlockExpr();
    eventHandler.endNonterminal("CompCommentConstructor", e0);
  }