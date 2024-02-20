function parse_CommentTest()
  {
    eventHandler.startNonterminal("CommentTest", e0);
    shift(96);                      // 'comment'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("CommentTest", e0);
  }