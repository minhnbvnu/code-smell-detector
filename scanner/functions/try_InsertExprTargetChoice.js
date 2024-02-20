function try_InsertExprTargetChoice()
  {
    switch (l1)
    {
    case 70:                        // 'after'
      shiftT(70);                   // 'after'
      break;
    case 84:                        // 'before'
      shiftT(84);                   // 'before'
      break;
    default:
      if (l1 == 79)                 // 'as'
      {
        shiftT(79);                 // 'as'
        lookahead1W(119);           // S^WS | '(:' | 'first' | 'last'
        switch (l1)
        {
        case 134:                   // 'first'
          shiftT(134);              // 'first'
          break;
        default:
          shiftT(170);              // 'last'
        }
      }
      lookahead1W(54);              // S^WS | '(:' | 'into'
      shiftT(163);                  // 'into'
    }
  }