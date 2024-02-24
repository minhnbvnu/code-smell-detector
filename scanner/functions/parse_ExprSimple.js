function parse_ExprSimple()
  {
    eventHandler.startNonterminal("ExprSimple", e0);
    switch (l1)
    {
    case 77:                        // 'append'
      lookahead2W(230);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' |
      break;
    case 218:                       // 'rename'
      lookahead2W(233);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' |
      break;
    case 219:                       // 'replace'
      lookahead2W(234);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' |
      break;
    case 110:                       // 'delete'
    case 159:                       // 'insert'
      lookahead2W(236);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' |
      break;
    case 103:                       // 'copy'
    case 129:                       // 'every'
    case 235:                       // 'some'
      lookahead2W(229);             // S^WS | EOF | '!' | '!=' | '#' | '$' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' |
      break;
    default:
      lk = l1;
    }
    if (lk == 133851)               // 'replace' 'value'
    {
      lk = memoized(9, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2;
        try
        {
          try_ReplaceExpr();
          lk = -6;
        }
        catch (p6A)
        {
          lk = -11;
        }
        b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
        b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
        b2 = b2A; e2 = e2A; end = e2A; }}
        memoize(9, e0, lk);
      }
    }
    switch (lk)
    {
    case 16001:                     // 'every' '$'
    case 16107:                     // 'some' '$'
      parse_QuantifiedExpr();
      break;
    case 97951:                     // 'insert' 'node'
    case 98463:                     // 'insert' 'nodes'
      parse_InsertExpr();
      break;
    case 97902:                     // 'delete' 'node'
    case 98414:                     // 'delete' 'nodes'
      parse_DeleteExpr();
      break;
    case 98010:                     // 'rename' 'node'
      parse_RenameExpr();
      break;
    case -6:
    case 98011:                     // 'replace' 'node'
      parse_ReplaceExpr();
      break;
    case 15975:                     // 'copy' '$'
      parse_TransformExpr();
      break;
    case 85102:                     // 'delete' 'json'
      parse_JSONDeleteExpr();
      break;
    case 85151:                     // 'insert' 'json'
      parse_JSONInsertExpr();
      break;
    case 85210:                     // 'rename' 'json'
      parse_JSONRenameExpr();
      break;
    case -11:
      parse_JSONReplaceExpr();
      break;
    case 85069:                     // 'append' 'json'
      parse_JSONAppendExpr();
      break;
    default:
      parse_OrExpr();
    }
    eventHandler.endNonterminal("ExprSimple", e0);
  }