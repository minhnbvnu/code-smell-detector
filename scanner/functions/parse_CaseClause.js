function parse_CaseClause()
  {
    eventHandler.startNonterminal("CaseClause", e0);
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
    parse_SequenceTypeUnion();
    shift(220);                     // 'return'
    lookahead1W(266);               // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
    whitespace();
    parse_ExprSingle();
    eventHandler.endNonterminal("CaseClause", e0);
  }