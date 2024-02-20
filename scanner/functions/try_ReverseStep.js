function try_ReverseStep()
  {
    switch (l1)
    {
    case 45:                        // '..'
      try_AbbrevReverseStep();
      break;
    default:
      try_ReverseAxis();
      lookahead1W(256);             // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_NodeTest();
    }
  }