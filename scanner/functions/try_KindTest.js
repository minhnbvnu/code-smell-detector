function try_KindTest()
  {
    switch (l1)
    {
    case 120:                       // 'document-node'
      try_DocumentTest();
      break;
    case 121:                       // 'element'
      try_ElementTest();
      break;
    case 82:                        // 'attribute'
      try_AttributeTest();
      break;
    case 227:                       // 'schema-element'
      try_SchemaElementTest();
      break;
    case 226:                       // 'schema-attribute'
      try_SchemaAttributeTest();
      break;
    case 216:                       // 'processing-instruction'
      try_PITest();
      break;
    case 96:                        // 'comment'
      try_CommentTest();
      break;
    case 244:                       // 'text'
      try_TextTest();
      break;
    case 185:                       // 'namespace-node'
      try_NamespaceNodeTest();
      break;
    default:
      try_AnyKindTest();
    }
  }