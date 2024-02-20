function try_SchemaAttributeTest()
  {
    shiftT(226);                    // 'schema-attribute'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_AttributeDeclaration();
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }