function try_SchemaElementTest()
  {
    shiftT(227);                    // 'schema-element'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_ElementDeclaration();
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }