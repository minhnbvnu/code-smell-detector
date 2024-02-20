function parse_StringConcatExpr()
  {
    eventHandler.startNonterminal("StringConcatExpr", e0);
    parse_RangeExpr();
    for (;;)
    {
      if (l1 != 280)                // '||'
      {
        break;
      }
      shift(280);                   // '||'
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_RangeExpr();
    }
    eventHandler.endNonterminal("StringConcatExpr", e0);
  }