function parse_SchemaAttributeTest()
  {
    eventHandler.startNonterminal("SchemaAttributeTest", e0);
    shift(226);                     // 'schema-attribute'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_AttributeDeclaration();
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("SchemaAttributeTest", e0);
  }