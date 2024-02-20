function parse_Prolog()
  {
    eventHandler.startNonterminal("Prolog", e0);
    for (;;)
    {
      lookahead1W(274);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      switch (l1)
      {
      case 108:                     // 'declare'
        lookahead2W(213);           // S^WS | EOF | '!' | '!=' | '#' | '%' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' |
        break;
      case 153:                     // 'import'
        lookahead2W(201);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      default:
        lk = l1;
      }
      if (lk != 42604               // 'declare' 'base-uri'
       && lk != 43628               // 'declare' 'boundary-space'
       && lk != 50284               // 'declare' 'construction'
       && lk != 53356               // 'declare' 'copy-namespaces'
       && lk != 54380               // 'declare' 'decimal-format'
       && lk != 55916               // 'declare' 'default'
       && lk != 72300               // 'declare' 'ft-option'
       && lk != 93337               // 'import' 'module'
       && lk != 94316               // 'declare' 'namespace'
       && lk != 104044              // 'declare' 'ordering'
       && lk != 113772              // 'declare' 'revalidation'
       && lk != 115353)             // 'import' 'schema'
      {
        break;
      }
      switch (l1)
      {
      case 108:                     // 'declare'
        lookahead2W(178);           // S^WS | '(:' | 'base-uri' | 'boundary-space' | 'construction' |
        break;
      default:
        lk = l1;
      }
      if (lk == 55916)              // 'declare' 'default'
      {
        lk = memoized(0, e0);
        if (lk == 0)
        {
          var b0A = b0; var e0A = e0; var l1A = l1;
          var b1A = b1; var e1A = e1; var l2A = l2;
          var b2A = b2; var e2A = e2;
          try
          {
            try_DefaultNamespaceDecl();
            lk = -1;
          }
          catch (p1A)
          {
            lk = -2;
          }
          b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
          b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
          b2 = b2A; e2 = e2A; end = e2A; }}
          memoize(0, e0, lk);
        }
      }
      switch (lk)
      {
      case -1:
        whitespace();
        parse_DefaultNamespaceDecl();
        break;
      case 94316:                   // 'declare' 'namespace'
        whitespace();
        parse_NamespaceDecl();
        break;
      case 153:                     // 'import'
        whitespace();
        parse_Import();
        break;
      case 72300:                   // 'declare' 'ft-option'
        whitespace();
        parse_FTOptionDecl();
        break;
      default:
        whitespace();
        parse_Setter();
      }
      lookahead1W(28);              // S^WS | '(:' | ';'
      whitespace();
      parse_Separator();
    }
    for (;;)
    {
      lookahead1W(274);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      switch (l1)
      {
      case 108:                     // 'declare'
        lookahead2W(210);           // S^WS | EOF | '!' | '!=' | '#' | '%' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' |
        break;
      default:
        lk = l1;
      }
      if (lk != 16492               // 'declare' '%'
       && lk != 48748               // 'declare' 'collection'
       && lk != 51820               // 'declare' 'context'
       && lk != 74348               // 'declare' 'function'
       && lk != 79468               // 'declare' 'index'
       && lk != 82540               // 'declare' 'integrity'
       && lk != 101996              // 'declare' 'option'
       && lk != 131692              // 'declare' 'updating'
       && lk != 134252)             // 'declare' 'variable'
      {
        break;
      }
      switch (l1)
      {
      case 108:                     // 'declare'
        lookahead2W(175);           // S^WS | '%' | '(:' | 'collection' | 'context' | 'function' | 'index' |
        break;
      default:
        lk = l1;
      }
      switch (lk)
      {
      case 51820:                   // 'declare' 'context'
        whitespace();
        parse_ContextItemDecl();
        break;
      case 101996:                  // 'declare' 'option'
        whitespace();
        parse_OptionDecl();
        break;
      default:
        whitespace();
        parse_AnnotatedDecl();
      }
      lookahead1W(28);              // S^WS | '(:' | ';'
      whitespace();
      parse_Separator();
    }
    eventHandler.endNonterminal("Prolog", e0);
  }