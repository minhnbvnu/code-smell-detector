function try_CountClause()
  {
    shiftT(105);                    // 'count'
    lookahead1W(21);                // S^WS | '$' | '(:'
    shiftT(31);                     // '$'
    lookahead1W(254);               // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_VarName();
  }