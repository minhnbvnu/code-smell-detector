function parse_ExprSingle()
  {
    eventHandler.startNonterminal("ExprSingle", e0);
    switch (l1)
    {
    case 137:                       // 'for'
      lookahead2W(235);             // S^WS | EOF | '!' | '!=' | '#' | '$' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' |
      break;
    case 174:                       // 'let'
      lookahead2W(232);             // S^WS | EOF | '!' | '!=' | '#' | '$' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' |
      break;
    case 250:                       // 'try'
      lookahead2W(231);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' |
      break;
    case 152:                       // 'if'
    case 243:                       // 'switch'
    case 253:                       // 'typeswitch'
      lookahead2W(228);             // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | ')' | '*' | '+' | ',' | '-' | '/' |
      break;
    default:
      lk = l1;
    }
    switch (lk)
    {
    case 16009:                     // 'for' '$'
    case 16046:                     // 'let' '$'
    case 116910:                    // 'let' 'score'
    case 119945:                    // 'for' 'sliding'
    case 128649:                    // 'for' 'tumbling'
      parse_FLWORExpr();
      break;
    case 17560:                     // 'if' '('
      parse_IfExpr();
      break;
    case 17651:                     // 'switch' '('
      parse_SwitchExpr();
      break;
    case 141562:                    // 'try' '{'
      parse_TryCatchExpr();
      break;
    case 17661:                     // 'typeswitch' '('
      parse_TypeswitchExpr();
      break;
    default:
      parse_ExprSimple();
    }
    eventHandler.endNonterminal("ExprSingle", e0);
  }