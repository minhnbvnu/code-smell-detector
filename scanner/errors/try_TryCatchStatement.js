function try_TryCatchStatement()
  {
    shiftT(250);                    // 'try'
    lookahead1W(87);                // S^WS | '(:' | '{'
    try_BlockStatement();
    lookahead1W(36);                // S^WS | '(:' | 'catch'
    shiftT(91);                     // 'catch'
    lookahead1W(256);               // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
    try_CatchErrorList();
    try_BlockStatement();
    for (;;)
    {
      lookahead1W(277);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      switch (l1)
      {
      case 91:                      // 'catch'
        lookahead2W(278);           // Wildcard | EQName^Token | S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' |
        break;
      default:
        lk = l1;
      }
      if (lk == 38491               // 'catch' 'and'
       || lk == 45659               // 'catch' 'cast'
       || lk == 46171               // 'catch' 'castable'
       || lk == 60507               // 'catch' 'div'
       || lk == 65627               // 'catch' 'eq'
       || lk == 67163               // 'catch' 'except'
       || lk == 74843               // 'catch' 'ge'
       || lk == 76891               // 'catch' 'gt'
       || lk == 77403               // 'catch' 'idiv'
       || lk == 82011               // 'catch' 'instance'
       || lk == 83035               // 'catch' 'intersect'
       || lk == 84059               // 'catch' 'is'
       || lk == 88155               // 'catch' 'le'
       || lk == 91227               // 'catch' 'lt'
       || lk == 92251               // 'catch' 'mod'
       || lk == 95323               // 'catch' 'ne'
       || lk == 102491              // 'catch' 'or'
       || lk == 127067              // 'catch' 'to'
       || lk == 127579              // 'catch' 'treat'
       || lk == 130139)             // 'catch' 'union'
      {
        lk = memoized(8, e0);
        if (lk == 0)
        {
          var b0A = b0; var e0A = e0; var l1A = l1;
          var b1A = b1; var e1A = e1; var l2A = l2;
          var b2A = b2; var e2A = e2;
          try
          {
            lookahead1W(36);        // S^WS | '(:' | 'catch'
            shiftT(91);             // 'catch'
            lookahead1W(256);       // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
            try_CatchErrorList();
            try_BlockStatement();
            memoize(8, e0A, -1);
            continue;
          }
          catch (p1A)
          {
            b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
            b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
            b2 = b2A; e2 = e2A; end = e2A; }}
            memoize(8, e0A, -2);
            break;
          }
        }
      }
      if (lk != -1
       && lk != 2651                // 'catch' Wildcard
       && lk != 3163                // 'catch' EQName^Token
       && lk != 35931               // 'catch' 'after'
       && lk != 36955               // 'catch' 'allowing'
       && lk != 37467               // 'catch' 'ancestor'
       && lk != 37979               // 'catch' 'ancestor-or-self'
       && lk != 39515               // 'catch' 'append'
       && lk != 40027               // 'catch' 'array'
       && lk != 40539               // 'catch' 'as'
       && lk != 41051               // 'catch' 'ascending'
       && lk != 41563               // 'catch' 'at'
       && lk != 42075               // 'catch' 'attribute'
       && lk != 42587               // 'catch' 'base-uri'
       && lk != 43099               // 'catch' 'before'
       && lk != 43611               // 'catch' 'boundary-space'
       && lk != 44123               // 'catch' 'break'
       && lk != 45147               // 'catch' 'case'
       && lk != 46683               // 'catch' 'catch'
       && lk != 47707               // 'catch' 'child'
       && lk != 48219               // 'catch' 'collation'
       && lk != 49243               // 'catch' 'comment'
       && lk != 49755               // 'catch' 'constraint'
       && lk != 50267               // 'catch' 'construction'
       && lk != 51803               // 'catch' 'context'
       && lk != 52315               // 'catch' 'continue'
       && lk != 52827               // 'catch' 'copy'
       && lk != 53339               // 'catch' 'copy-namespaces'
       && lk != 53851               // 'catch' 'count'
       && lk != 54363               // 'catch' 'decimal-format'
       && lk != 55387               // 'catch' 'declare'
       && lk != 55899               // 'catch' 'default'
       && lk != 56411               // 'catch' 'delete'
       && lk != 56923               // 'catch' 'descendant'
       && lk != 57435               // 'catch' 'descendant-or-self'
       && lk != 57947               // 'catch' 'descending'
       && lk != 61019               // 'catch' 'document'
       && lk != 61531               // 'catch' 'document-node'
       && lk != 62043               // 'catch' 'element'
       && lk != 62555               // 'catch' 'else'
       && lk != 63067               // 'catch' 'empty'
       && lk != 63579               // 'catch' 'empty-sequence'
       && lk != 64091               // 'catch' 'encoding'
       && lk != 64603               // 'catch' 'end'
       && lk != 66139               // 'catch' 'every'
       && lk != 67675               // 'catch' 'exit'
       && lk != 68187               // 'catch' 'external'
       && lk != 68699               // 'catch' 'first'
       && lk != 69211               // 'catch' 'following'
       && lk != 69723               // 'catch' 'following-sibling'
       && lk != 70235               // 'catch' 'for'
       && lk != 72283               // 'catch' 'ft-option'
       && lk != 74331               // 'catch' 'function'
       && lk != 75867               // 'catch' 'group'
       && lk != 77915               // 'catch' 'if'
       && lk != 78427               // 'catch' 'import'
       && lk != 78939               // 'catch' 'in'
       && lk != 79451               // 'catch' 'index'
       && lk != 81499               // 'catch' 'insert'
       && lk != 82523               // 'catch' 'integrity'
       && lk != 83547               // 'catch' 'into'
       && lk != 84571               // 'catch' 'item'
       && lk != 85083               // 'catch' 'json'
       && lk != 85595               // 'catch' 'json-item'
       && lk != 87131               // 'catch' 'last'
       && lk != 87643               // 'catch' 'lax'
       && lk != 89179               // 'catch' 'let'
       && lk != 90203               // 'catch' 'loop'
       && lk != 92763               // 'catch' 'modify'
       && lk != 93275               // 'catch' 'module'
       && lk != 94299               // 'catch' 'namespace'
       && lk != 94811               // 'catch' 'namespace-node'
       && lk != 97883               // 'catch' 'node'
       && lk != 98395               // 'catch' 'nodes'
       && lk != 99419               // 'catch' 'object'
       && lk != 101467              // 'catch' 'only'
       && lk != 101979              // 'catch' 'option'
       && lk != 103003              // 'catch' 'order'
       && lk != 103515              // 'catch' 'ordered'
       && lk != 104027              // 'catch' 'ordering'
       && lk != 105563              // 'catch' 'parent'
       && lk != 108635              // 'catch' 'preceding'
       && lk != 109147              // 'catch' 'preceding-sibling'
       && lk != 110683              // 'catch' 'processing-instruction'
       && lk != 111707              // 'catch' 'rename'
       && lk != 112219              // 'catch' 'replace'
       && lk != 112731              // 'catch' 'return'
       && lk != 113243              // 'catch' 'returning'
       && lk != 113755              // 'catch' 'revalidation'
       && lk != 114779              // 'catch' 'satisfies'
       && lk != 115291              // 'catch' 'schema'
       && lk != 115803              // 'catch' 'schema-attribute'
       && lk != 116315              // 'catch' 'schema-element'
       && lk != 116827              // 'catch' 'score'
       && lk != 117339              // 'catch' 'self'
       && lk != 119899              // 'catch' 'sliding'
       && lk != 120411              // 'catch' 'some'
       && lk != 120923              // 'catch' 'stable'
       && lk != 121435              // 'catch' 'start'
       && lk != 122971              // 'catch' 'strict'
       && lk != 123995              // 'catch' 'structured-item'
       && lk != 124507              // 'catch' 'switch'
       && lk != 125019              // 'catch' 'text'
       && lk != 128091              // 'catch' 'try'
       && lk != 128603              // 'catch' 'tumbling'
       && lk != 129115              // 'catch' 'type'
       && lk != 129627              // 'catch' 'typeswitch'
       && lk != 131163              // 'catch' 'unordered'
       && lk != 131675              // 'catch' 'updating'
       && lk != 133211              // 'catch' 'validate'
       && lk != 133723              // 'catch' 'value'
       && lk != 134235              // 'catch' 'variable'
       && lk != 134747              // 'catch' 'version'
       && lk != 136283              // 'catch' 'where'
       && lk != 136795              // 'catch' 'while'
       && lk != 138331              // 'catch' 'with'
       && lk != 140379)             // 'catch' 'xquery'
      {
        break;
      }
      lookahead1W(36);              // S^WS | '(:' | 'catch'
      shiftT(91);                   // 'catch'
      lookahead1W(256);             // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      try_CatchErrorList();
      try_BlockStatement();
    }
  }