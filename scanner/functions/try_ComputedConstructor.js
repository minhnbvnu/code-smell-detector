function try_ComputedConstructor()
  {
    switch (l1)
    {
    case 119:                       // 'document'
      try_CompDocConstructor();
      break;
    case 121:                       // 'element'
      try_CompElemConstructor();
      break;
    case 82:                        // 'attribute'
      try_CompAttrConstructor();
      break;
    case 184:                       // 'namespace'
      try_CompNamespaceConstructor();
      break;
    case 244:                       // 'text'
      try_CompTextConstructor();
      break;
    case 96:                        // 'comment'
      try_CompCommentConstructor();
      break;
    default:
      try_CompPIConstructor();
    }
  }