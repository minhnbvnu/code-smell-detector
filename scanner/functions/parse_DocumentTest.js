function parse_DocumentTest()
  {
    eventHandler.startNonterminal("DocumentTest", e0);
    shift(120);                     // 'document-node'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(144);               // S^WS | '(:' | ')' | 'element' | 'schema-element'
    if (l1 != 37)                   // ')'
    {
      switch (l1)
      {
      case 121:                     // 'element'
        whitespace();
        parse_ElementTest();
        break;
      default:
        whitespace();
        parse_SchemaElementTest();
      }
    }
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("DocumentTest", e0);
  }