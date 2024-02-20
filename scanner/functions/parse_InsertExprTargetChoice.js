function parse_InsertExprTargetChoice()
  {
    eventHandler.startNonterminal("InsertExprTargetChoice", e0);
    switch (l1)
    {
    case 70:                        // 'after'
      shift(70);                    // 'after'
      break;
    case 84:                        // 'before'
      shift(84);                    // 'before'
      break;
    default:
      if (l1 == 79)                 // 'as'
      {
        shift(79);                  // 'as'
        lookahead1W(119);           // S^WS | '(:' | 'first' | 'last'
        switch (l1)
        {
        case 134:                   // 'first'
          shift(134);               // 'first'
          break;
        default:
          shift(170);               // 'last'
        }
      }
      lookahead1W(54);              // S^WS | '(:' | 'into'
      shift(163);                   // 'into'
    }
    eventHandler.endNonterminal("InsertExprTargetChoice", e0);
  }