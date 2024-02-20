function parse_InstanceofExpr()
  {
    eventHandler.startNonterminal("InstanceofExpr", e0);
    parse_TreatExpr();
    lookahead1W(223);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 160)                  // 'instance'
    {
      shift(160);                   // 'instance'
      lookahead1W(64);              // S^WS | '(:' | 'of'
      shift(196);                   // 'of'
      lookahead1W(259);             // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_SequenceType();
    }
    eventHandler.endNonterminal("InstanceofExpr", e0);
  }