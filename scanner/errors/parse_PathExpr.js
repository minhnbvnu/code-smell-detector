function parse_PathExpr()
  {
    eventHandler.startNonterminal("PathExpr", e0);
    switch (l1)
    {
    case 46:                        // '/'
      shift(46);                    // '/'
      lookahead1W(285);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      switch (l1)
      {
      case 25:                      // EOF
      case 26:                      // '!'
      case 27:                      // '!='
      case 37:                      // ')'
      case 38:                      // '*'
      case 40:                      // '+'
      case 41:                      // ','
      case 42:                      // '-'
      case 49:                      // ':'
      case 53:                      // ';'
      case 57:                      // '<<'
      case 58:                      // '<='
      case 60:                      // '='
      case 61:                      // '>'
      case 62:                      // '>='
      case 63:                      // '>>'
      case 69:                      // ']'
      case 87:                      // 'by'
      case 99:                      // 'contains'
      case 205:                     // 'paragraphs'
      case 232:                     // 'sentences'
      case 247:                     // 'times'
      case 273:                     // 'words'
      case 279:                     // '|'
      case 280:                     // '||'
      case 281:                     // '|}'
      case 282:                     // '}'
        break;
      default:
        whitespace();
        parse_RelativePathExpr();
      }
      break;
    case 47:                        // '//'
      shift(47);                    // '//'
      lookahead1W(264);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      whitespace();
      parse_RelativePathExpr();
      break;
    default:
      parse_RelativePathExpr();
    }
    eventHandler.endNonterminal("PathExpr", e0);
  }