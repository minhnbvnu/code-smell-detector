function parse_NamespaceNodeTest()
  {
    eventHandler.startNonterminal("NamespaceNodeTest", e0);
    shift(185);                     // 'namespace-node'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("NamespaceNodeTest", e0);
  }