function try_JSONInsertExpr()
  {
    switch (l1)
    {
    case 159:                       // 'insert'
      lookahead2W(56);              // S^WS | '(:' | 'json'
      break;
    default:
      lk = l1;
    }
    lk = memoized(10, e0);
    if (lk == 0)
    {
      var b0A = b0; var e0A = e0; var l1A = l1;
      var b1A = b1; var e1A = e1; var l2A = l2;
      var b2A = b2; var e2A = e2;
      try
      {
        shiftT(159);                // 'insert'
        lookahead1W(56);            // S^WS | '(:' | 'json'
        shiftT(166);                // 'json'
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        try_ExprSingle();
        shiftT(163);                // 'into'
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        try_ExprSingle();
        switch (l1)
        {
        case 81:                    // 'at'
          lookahead2W(69);          // S^WS | '(:' | 'position'
          break;
        default:
          lk = l1;
        }
        if (lk == 108113)           // 'at' 'position'
        {
          lk = memoized(11, e0);
          if (lk == 0)
          {
            var b0B = b0; var e0B = e0; var l1B = l1;
            var b1B = b1; var e1B = e1; var l2B = l2;
            var b2B = b2; var e2B = e2;
            try
            {
              shiftT(81);           // 'at'
              lookahead1W(69);      // S^WS | '(:' | 'position'
              shiftT(211);          // 'position'
              lookahead1W(266);     // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
              try_ExprSingle();
              memoize(11, e0B, -1);
            }
            catch (p1B)
            {
              b0 = b0B; e0 = e0B; l1 = l1B; if (l1 == 0) {end = e0B;} else {
              b1 = b1B; e1 = e1B; l2 = l2B; if (l2 == 0) {end = e1B;} else {
              b2 = b2B; e2 = e2B; end = e2B; }}
              memoize(11, e0B, -2);
            }
            lk = -2;
          }
        }
        if (lk == -1)
        {
          shiftT(81);               // 'at'
          lookahead1W(69);          // S^WS | '(:' | 'position'
          shiftT(211);              // 'position'
          lookahead1W(266);         // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
          try_ExprSingle();
        }
        memoize(10, e0A, -1);
        lk = -3;
      }
      catch (p1A)
      {
        lk = -2;
        b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
        b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
        b2 = b2A; e2 = e2A; end = e2A; }}
        memoize(10, e0A, -2);
      }
    }
    switch (lk)
    {
    case -1:
      shiftT(159);                  // 'insert'
      lookahead1W(56);              // S^WS | '(:' | 'json'
      shiftT(166);                  // 'json'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_ExprSingle();
      shiftT(163);                  // 'into'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_ExprSingle();
      switch (l1)
      {
      case 81:                      // 'at'
        lookahead2W(69);            // S^WS | '(:' | 'position'
        break;
      default:
        lk = l1;
      }
      if (lk == 108113)             // 'at' 'position'
      {
        lk = memoized(11, e0);
        if (lk == 0)
        {
          var b0B = b0; var e0B = e0; var l1B = l1;
          var b1B = b1; var e1B = e1; var l2B = l2;
          var b2B = b2; var e2B = e2;
          try
          {
            shiftT(81);             // 'at'
            lookahead1W(69);        // S^WS | '(:' | 'position'
            shiftT(211);            // 'position'
            lookahead1W(266);       // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
            try_ExprSingle();
            memoize(11, e0B, -1);
          }
          catch (p1B)
          {
            b0 = b0B; e0 = e0B; l1 = l1B; if (l1 == 0) {end = e0B;} else {
            b1 = b1B; e1 = e1B; l2 = l2B; if (l2 == 0) {end = e1B;} else {
            b2 = b2B; e2 = e2B; end = e2B; }}
            memoize(11, e0B, -2);
          }
          lk = -2;
        }
      }
      if (lk == -1)
      {
        shiftT(81);                 // 'at'
        lookahead1W(69);            // S^WS | '(:' | 'position'
        shiftT(211);                // 'position'
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        try_ExprSingle();
      }
      break;
    case -3:
      break;
    default:
      shiftT(159);                  // 'insert'
      lookahead1W(56);              // S^WS | '(:' | 'json'
      shiftT(166);                  // 'json'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_PairConstructorList();
      shiftT(163);                  // 'into'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_ExprSingle();
    }
  }