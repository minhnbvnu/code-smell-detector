function parse_CastableExpr()
  {
    eventHandler.startNonterminal("CastableExpr", e0);
    parse_CastExpr();
    lookahead1W(225);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 90)                   // 'castable'
    {
      shift(90);                    // 'castable'
      lookahead1W(30);              // S^WS | '(:' | 'as'
      shift(79);                    // 'as'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_SingleType();
    }
    eventHandler.endNonterminal("CastableExpr", e0);
  }