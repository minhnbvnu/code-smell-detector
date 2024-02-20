function parse_ContextItemDecl()
  {
    eventHandler.startNonterminal("ContextItemDecl", e0);
    shift(108);                     // 'declare'
    lookahead1W(43);                // S^WS | '(:' | 'context'
    shift(101);                     // 'context'
    lookahead1W(55);                // S^WS | '(:' | 'item'
    shift(165);                     // 'item'
    lookahead1W(147);               // S^WS | '(:' | ':=' | 'as' | 'external'
    if (l1 == 79)                   // 'as'
    {
      shift(79);                    // 'as'
      lookahead1W(259);             // EQName^Token | S^WS | '%' | '(' | '(:' | 'after' | 'allowing' | 'ancestor' |
      whitespace();
      parse_ItemType();
    }
    lookahead1W(106);               // S^WS | '(:' | ':=' | 'external'
    switch (l1)
    {
    case 52:                        // ':='
      shift(52);                    // ':='
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_VarValue();
      break;
    default:
      shift(133);                   // 'external'
      lookahead1W(104);             // S^WS | '(:' | ':=' | ';'
      if (l1 == 52)                 // ':='
      {
        shift(52);                  // ':='
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        whitespace();
        parse_VarDefaultValue();
      }
    }
    eventHandler.endNonterminal("ContextItemDecl", e0);
  }