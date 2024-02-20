function parse_Setter()
  {
    eventHandler.startNonterminal("Setter", e0);
    switch (l1)
    {
    case 108:                       // 'declare'
      lookahead2W(172);             // S^WS | '(:' | 'base-uri' | 'boundary-space' | 'construction' |
      break;
    default:
      lk = l1;
    }
    if (lk == 55916)                // 'declare' 'default'
    {
      lk = memoized(1, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2;
        try
        {
          try_DefaultCollationDecl();
          lk = -2;
        }
        catch (p2A)
        {
          try
          {
            b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
            b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
            b2 = b2A; e2 = e2A; end = e2A; }}
            try_EmptyOrderDecl();
            lk = -6;
          }
          catch (p6A)
          {
            lk = -9;
          }
        }
        b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
        b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
        b2 = b2A; e2 = e2A; end = e2A; }}
        memoize(1, e0, lk);
      }
    }
    switch (lk)
    {
    case 43628:                     // 'declare' 'boundary-space'
      parse_BoundarySpaceDecl();
      break;
    case -2:
      parse_DefaultCollationDecl();
      break;
    case 42604:                     // 'declare' 'base-uri'
      parse_BaseURIDecl();
      break;
    case 50284:                     // 'declare' 'construction'
      parse_ConstructionDecl();
      break;
    case 104044:                    // 'declare' 'ordering'
      parse_OrderingModeDecl();
      break;
    case -6:
      parse_EmptyOrderDecl();
      break;
    case 113772:                    // 'declare' 'revalidation'
      parse_RevalidationDecl();
      break;
    case 53356:                     // 'declare' 'copy-namespaces'
      parse_CopyNamespacesDecl();
      break;
    default:
      parse_DecimalFormatDecl();
    }
    eventHandler.endNonterminal("Setter", e0);
  }