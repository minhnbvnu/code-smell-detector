function parse_CaseStatement()
  {
    eventHandler.startNonterminal("CaseStatement", e0);
    shift(88);                      // 'case'
    lookahead1W(261);               // EQName^Token | S^WS | '$' | '%' | '(' | '(:' | 'after' | 'allowing' |
    if (l1 == 31)                   // '$'
    {
      shift(31);                    // '$'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_VarName();
      lookahead1W(30);              // S^WS | '(:' | 'as'
      shift(79);                    // 'as'
    }
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_SequenceType();
    lookahead1W(70);                // S^WS | '(:' | 'return'
    shift(220);                     // 'return'
    lookahead1W(269);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_Statement();
    eventHandler.endNonterminal("CaseStatement", e0);
  }