function parse_AnnotatedDecl()
  {
    eventHandler.startNonterminal("AnnotatedDecl", e0);
    shift(108);                     // 'declare'
    for (;;)
    {
      lookahead1W(170);             // S^WS | '%' | '(:' | 'collection' | 'function' | 'index' | 'integrity' |
      if (l1 != 32                  // '%'
       && l1 != 257)                // 'updating'
      {
        break;
      }
      switch (l1)
      {
      case 257:                     // 'updating'
        whitespace();
        parse_CompatibilityAnnotation();
        break;
      default:
        whitespace();
        parse_Annotation();
      }
    }
    switch (l1)
    {
    case 262:                       // 'variable'
      whitespace();
      parse_VarDecl();
      break;
    case 145:                       // 'function'
      whitespace();
      parse_FunctionDecl();
      break;
    case 95:                        // 'collection'
      whitespace();
      parse_CollectionDecl();
      break;
    case 155:                       // 'index'
      whitespace();
      parse_IndexDecl();
      break;
    default:
      whitespace();
      parse_ICDecl();
    }
    eventHandler.endNonterminal("AnnotatedDecl", e0);
  }