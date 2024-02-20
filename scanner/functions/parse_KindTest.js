function parse_KindTest()
  {
    eventHandler.startNonterminal("KindTest", e0);
    switch (l1)
    {
    case 120:                       // 'document-node'
      parse_DocumentTest();
      break;
    case 121:                       // 'element'
      parse_ElementTest();
      break;
    case 82:                        // 'attribute'
      parse_AttributeTest();
      break;
    case 227:                       // 'schema-element'
      parse_SchemaElementTest();
      break;
    case 226:                       // 'schema-attribute'
      parse_SchemaAttributeTest();
      break;
    case 216:                       // 'processing-instruction'
      parse_PITest();
      break;
    case 96:                        // 'comment'
      parse_CommentTest();
      break;
    case 244:                       // 'text'
      parse_TextTest();
      break;
    case 185:                       // 'namespace-node'
      parse_NamespaceNodeTest();
      break;
    default:
      parse_AnyKindTest();
    }
    eventHandler.endNonterminal("KindTest", e0);
  }