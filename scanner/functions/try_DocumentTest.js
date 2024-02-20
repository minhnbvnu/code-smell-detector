function try_DocumentTest()
  {
    shiftT(120);                    // 'document-node'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shiftT(34);                     // '('
    lookahead1W(144);               // S^WS | '(:' | ')' | 'element' | 'schema-element'
    if (l1 != 37)                   // ')'
    {
      switch (l1)
      {
      case 121:                     // 'element'
        try_ElementTest();
        break;
      default:
        try_SchemaElementTest();
      }
    }
    lookahead1W(23);                // S^WS | '(:' | ')'
    shiftT(37);                     // ')'
  }