function parse_SchemaPrefix()
  {
    eventHandler.startNonterminal("SchemaPrefix", e0);
    switch (l1)
    {
    case 184:                       // 'namespace'
      shift(184);                   // 'namespace'
      lookahead1W(248);             // NCName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_NCName();
      lookahead1W(29);              // S^WS | '(:' | '='
      shift(60);                    // '='
      break;
    default:
      shift(109);                   // 'default'
      lookahead1W(47);              // S^WS | '(:' | 'element'
      shift(121);                   // 'element'
      lookahead1W(61);              // S^WS | '(:' | 'namespace'
      shift(184);                   // 'namespace'
    }
    eventHandler.endNonterminal("SchemaPrefix", e0);
  }