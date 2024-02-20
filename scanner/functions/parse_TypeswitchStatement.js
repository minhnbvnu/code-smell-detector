function parse_TypeswitchStatement()
  {
    eventHandler.startNonterminal("TypeswitchStatement", e0);
    shift(253);                     // 'typeswitch'
    lookahead1W(22);                // S^WS | '(' | '(:'
    shift(34);                      // '('
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Expr();
    shift(37);                      // ')'
    for (;;)
    {
      lookahead1W(35);              // S^WS | '(:' | 'case'
      whitespace();
      parse_CaseStatement();
      lookahead1W(113);             // S^WS | '(:' | 'case' | 'default'
      if (l1 != 88)                 // 'case'
      {
        break;
      }
    }
    shift(109);                     // 'default'
    lookahead1W(95);                // S^WS | '$' | '(:' | 'return'
    if (l1 == 31)                   // '$'
    {
      shift(31);                    // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_VarName();
    }
    lookahead1W(70);                // S^WS | '(:' | 'return'
    shift(220);                     // 'return'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Statement();
    eventHandler.endNonterminal("TypeswitchStatement", e0);
  }