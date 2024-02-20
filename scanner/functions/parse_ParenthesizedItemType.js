function parse_ParenthesizedItemType()
  {
    eventHandler.startNonterminal("ParenthesizedItemType", e0);
    shift(34);                      // '('
    lookahead1W(259);               // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
    whitespace();
    parse_ItemType();
    lookahead1W(23);                // S^WS | '(:' | ')'
    shift(37);                      // ')'
    eventHandler.endNonterminal("ParenthesizedItemType", e0);
  }