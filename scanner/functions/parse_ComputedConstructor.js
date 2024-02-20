function parse_ComputedConstructor()
  {
    eventHandler.startNonterminal("ComputedConstructor", e0);
    switch (l1)
    {
    case 119:                       // 'document'
      parse_CompDocConstructor();
      break;
    case 121:                       // 'element'
      parse_CompElemConstructor();
      break;
    case 82:                        // 'attribute'
      parse_CompAttrConstructor();
      break;
    case 184:                       // 'namespace'
      parse_CompNamespaceConstructor();
      break;
    case 244:                       // 'text'
      parse_CompTextConstructor();
      break;
    case 96:                        // 'comment'
      parse_CompCommentConstructor();
      break;
    default:
      parse_CompPIConstructor();
    }
    eventHandler.endNonterminal("ComputedConstructor", e0);
  }