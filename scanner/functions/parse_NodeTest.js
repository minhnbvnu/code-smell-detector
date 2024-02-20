function parse_NodeTest()
  {
    eventHandler.startNonterminal("NodeTest", e0);
    switch (l1)
    {
    case 82:                        // 'attribute'
    case 96:                        // 'comment'
    case 120:                       // 'document-node'
    case 121:                       // 'element'
    case 185:                       // 'namespace-node'
    case 191:                       // 'node'
    case 216:                       // 'processing-instruction'
    case 226:                       // 'schema-attribute'
    case 227:                       // 'schema-element'
    case 244:                       // 'text'
      lookahead2W(240);             // S^WS | EOF | '!' | '!=' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' | '//' |
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 17490:                     // 'attribute' '('
    case 17504:                     // 'comment' '('
    case 17528:                     // 'document-node' '('
    case 17529:                     // 'element' '('
    case 17593:                     // 'namespace-node' '('
    case 17599:                     // 'node' '('
    case 17624:                     // 'processing-instruction' '('
    case 17634:                     // 'schema-attribute' '('
    case 17635:                     // 'schema-element' '('
    case 17652:                     // 'text' '('
      parse_KindTest();
      break;
    default:
      parse_NameTest();
    }
    eventHandler.endNonterminal("NodeTest", e0);
  }