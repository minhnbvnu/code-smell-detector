function try_ItemType()
  {
    switch (l1)
    {
    case 78:                        // 'array'
    case 82:                        // 'attribute'
    case 96:                        // 'comment'
    case 120:                       // 'document-node'
    case 121:                       // 'element'
    case 145:                       // 'function'
    case 165:                       // 'item'
    case 167:                       // 'json-item'
    case 185:                       // 'namespace-node'
    case 191:                       // 'node'
    case 194:                       // 'object'
    case 216:                       // 'processing-instruction'
    case 226:                       // 'schema-attribute'
    case 227:                       // 'schema-element'
    case 242:                       // 'structured-item'
    case 244:                       // 'text'
      lookahead2W(242);             // S^WS | EOF | '!=' | '(' | '(:' | ')' | '*' | '*' | '+' | ',' | '-' | ':' | ':=' |
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
      try_KindTest();
      break;
    case 17573:                     // 'item' '('
      shiftT(165);                  // 'item'
      lookahead1W(22);              // S^WS | '(' | '(:'
      shiftT(34);                   // '('
      lookahead1W(23);              // S^WS | '(:' | ')'
      shiftT(37);                   // ')'
      break;
    case 32:                        // '%'
    case 17553:                     // 'function' '('
      try_FunctionTest();
      break;
    case 34:                        // '('
      try_ParenthesizedItemType();
      break;
    case 17486:                     // 'array' '('
    case 17575:                     // 'json-item' '('
    case 17602:                     // 'object' '('
      try_JSONTest();
      break;
    case 17650:                     // 'structured-item' '('
      try_StructuredItemTest();
      break;
    default:
      try_AtomicOrUnionType();
    }
  }