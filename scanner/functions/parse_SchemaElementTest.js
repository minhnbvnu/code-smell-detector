function parse_SchemaElementTest()
  {
    eventHandler.startNonterminal("SchemaElementTest", e0);
    shift(227);                     // 'schema-element'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_ElementDeclaration();
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("SchemaElementTest", e0);
  }