function try_RelativePathExpr()
  {
    try_StepExpr();
    for (;;)
    {
      switch (l1)
      {
      case 26:                      // '!'
        lookahead2W(265);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        break;
      default:
        lk = l1;
      }
      if (lk != 25                  // EOF
       && lk != 27                  // '!='
       && lk != 37                  // ')'
       && lk != 38                  // '*'
       && lk != 40                  // '+'
       && lk != 41                  // ','
       && lk != 42                  // '-'
       && lk != 46                  // '/'
       && lk != 47                  // '//'
       && lk != 49                  // ':'
       && lk != 53                  // ';'
       && lk != 54                  // '<'
       && lk != 57                  // '<<'
       && lk != 58                  // '<='
       && lk != 60                  // '='
       && lk != 61                  // '>'
       && lk != 62                  // '>='
       && lk != 63                  // '>>'
       && lk != 69                  // ']'
       && lk != 70                  // 'after'
       && lk != 75                  // 'and'
       && lk != 79                  // 'as'
       && lk != 80                  // 'ascending'
       && lk != 81                  // 'at'
       && lk != 84                  // 'before'
       && lk != 87                  // 'by'
       && lk != 88                  // 'case'
       && lk != 89                  // 'cast'
       && lk != 90                  // 'castable'
       && lk != 94                  // 'collation'
       && lk != 99                  // 'contains'
       && lk != 105                 // 'count'
       && lk != 109                 // 'default'
       && lk != 113                 // 'descending'
       && lk != 118                 // 'div'
       && lk != 122                 // 'else'
       && lk != 123                 // 'empty'
       && lk != 126                 // 'end'
       && lk != 128                 // 'eq'
       && lk != 131                 // 'except'
       && lk != 137                 // 'for'
       && lk != 146                 // 'ge'
       && lk != 148                 // 'group'
       && lk != 150                 // 'gt'
       && lk != 151                 // 'idiv'
       && lk != 160                 // 'instance'
       && lk != 162                 // 'intersect'
       && lk != 163                 // 'into'
       && lk != 164                 // 'is'
       && lk != 172                 // 'le'
       && lk != 174                 // 'let'
       && lk != 178                 // 'lt'
       && lk != 180                 // 'mod'
       && lk != 181                 // 'modify'
       && lk != 186                 // 'ne'
       && lk != 198                 // 'only'
       && lk != 200                 // 'or'
       && lk != 201                 // 'order'
       && lk != 205                 // 'paragraphs'
       && lk != 220                 // 'return'
       && lk != 224                 // 'satisfies'
       && lk != 232                 // 'sentences'
       && lk != 236                 // 'stable'
       && lk != 237                 // 'start'
       && lk != 247                 // 'times'
       && lk != 248                 // 'to'
       && lk != 249                 // 'treat'
       && lk != 254                 // 'union'
       && lk != 266                 // 'where'
       && lk != 270                 // 'with'
       && lk != 273                 // 'words'
       && lk != 279                 // '|'
       && lk != 280                 // '||'
       && lk != 281                 // '|}'
       && lk != 282                 // '}'
       && lk != 23578               // '!' '/'
       && lk != 24090)              // '!' '//'
      {
        lk = memoized(3, e0);
        if (lk == 0)
        {
          var b0A = b0; var e0A = e0; var l1A = l1;
          var b1A = b1; var e1A = e1; var l2A = l2;
          var b2A = b2; var e2A = e2;
          try
          {
            switch (l1)
            {
            case 46:                // '/'
              shiftT(46);           // '/'
              break;
            case 47:                // '//'
              shiftT(47);           // '//'
              break;
            default:
              shiftT(26);           // '!'
            }
            lookahead1W(264);       // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
            try_StepExpr();
            memoize(3, e0A, -1);
            continue;
          }
          catch (p1A)
          {
            b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
            b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
            b2 = b2A; e2 = e2A; end = e2A; }}
            memoize(3, e0A, -2);
            break;
          }
        }
      }
      if (lk != -1
       && lk != 46                  // '/'
       && lk != 47)                 // '//'
      {
        break;
      }
      switch (l1)
      {
      case 46:                      // '/'
        shiftT(46);                 // '/'
        break;
      case 47:                      // '//'
        shiftT(47);                 // '//'
        break;
      default:
        shiftT(26);                 // '!'
      }
      lookahead1W(264);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      try_StepExpr();
    }
  }