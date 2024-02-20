function parse_ComparisonExpr()
  {
    eventHandler.startNonterminal("ComparisonExpr", e0);
    parse_FTContainsExpr();
    if (l1 == 27                    // '!='
     || l1 == 54                    // '<'
     || l1 == 57                    // '<<'
     || l1 == 58                    // '<='
     || l1 == 60                    // '='
     || l1 == 61                    // '>'
     || l1 == 62                    // '>='
     || l1 == 63                    // '>>'
     || l1 == 128                   // 'eq'
     || l1 == 146                   // 'ge'
     || l1 == 150                   // 'gt'
     || l1 == 164                   // 'is'
     || l1 == 172                   // 'le'
     || l1 == 178                   // 'lt'
     || l1 == 186)                  // 'ne'
    {
      switch (l1)
      {
      case 128:                     // 'eq'
      case 146:                     // 'ge'
      case 150:                     // 'gt'
      case 172:                     // 'le'
      case 178:                     // 'lt'
      case 186:                     // 'ne'
        whitespace();
        parse_ValueComp();
        break;
      case 57:                      // '<<'
      case 63:                      // '>>'
      case 164:                     // 'is'
        whitespace();
        parse_NodeComp();
        break;
      default:
        whitespace();
        parse_GeneralComp();
      }
      lookahead1W(266);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_FTContainsExpr();
    }
    eventHandler.endNonterminal("ComparisonExpr", e0);
  }