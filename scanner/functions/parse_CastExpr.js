function parse_CastExpr()
  {
    eventHandler.startNonterminal("CastExpr", e0);
    parse_UnaryExpr();
    lookahead1W(227);               // S^WS | EOF | '!=' | '(:' | ')' | '*' | '+' | ',' | '-' | ':' | ';' | '<' | '<<' |
    if (l1 == 89)                   // 'cast'
    {
      shift(89);                    // 'cast'
      lookahead1W(30);              // S^WS | '(:' | 'as'
      shift(79);                    // 'as'
      lookahead1W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_SingleType();
    }
    eventHandler.endNonterminal("CastExpr", e0);
  }