function try_GroupingSpec()
  {
    switch (l1)
    {
    case 31:                        // '$'
      lookahead2W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      break;
    default:
      lk = l1;
    }
    if (lk == 3103                  // '$' EQName^Token
     || lk == 35871                 // '$' 'after'
     || lk == 36895                 // '$' 'allowing'
     || lk == 37407                 // '$' 'ancestor'
     || lk == 37919                 // '$' 'ancestor-or-self'
     || lk == 38431                 // '$' 'and'
     || lk == 39455                 // '$' 'append'
     || lk == 39967                 // '$' 'array'
     || lk == 40479                 // '$' 'as'
     || lk == 40991                 // '$' 'ascending'
     || lk == 41503                 // '$' 'at'
     || lk == 42015                 // '$' 'attribute'
     || lk == 42527                 // '$' 'base-uri'
     || lk == 43039                 // '$' 'before'
     || lk == 43551                 // '$' 'boundary-space'
     || lk == 44063                 // '$' 'break'
     || lk == 45087                 // '$' 'case'
     || lk == 45599                 // '$' 'cast'
     || lk == 46111                 // '$' 'castable'
     || lk == 46623                 // '$' 'catch'
     || lk == 47647                 // '$' 'child'
     || lk == 48159                 // '$' 'collation'
     || lk == 49183                 // '$' 'comment'
     || lk == 49695                 // '$' 'constraint'
     || lk == 50207                 // '$' 'construction'
     || lk == 51743                 // '$' 'context'
     || lk == 52255                 // '$' 'continue'
     || lk == 52767                 // '$' 'copy'
     || lk == 53279                 // '$' 'copy-namespaces'
     || lk == 53791                 // '$' 'count'
     || lk == 54303                 // '$' 'decimal-format'
     || lk == 55327                 // '$' 'declare'
     || lk == 55839                 // '$' 'default'
     || lk == 56351                 // '$' 'delete'
     || lk == 56863                 // '$' 'descendant'
     || lk == 57375                 // '$' 'descendant-or-self'
     || lk == 57887                 // '$' 'descending'
     || lk == 60447                 // '$' 'div'
     || lk == 60959                 // '$' 'document'
     || lk == 61471                 // '$' 'document-node'
     || lk == 61983                 // '$' 'element'
     || lk == 62495                 // '$' 'else'
     || lk == 63007                 // '$' 'empty'
     || lk == 63519                 // '$' 'empty-sequence'
     || lk == 64031                 // '$' 'encoding'
     || lk == 64543                 // '$' 'end'
     || lk == 65567                 // '$' 'eq'
     || lk == 66079                 // '$' 'every'
     || lk == 67103                 // '$' 'except'
     || lk == 67615                 // '$' 'exit'
     || lk == 68127                 // '$' 'external'
     || lk == 68639                 // '$' 'first'
     || lk == 69151                 // '$' 'following'
     || lk == 69663                 // '$' 'following-sibling'
     || lk == 70175                 // '$' 'for'
     || lk == 72223                 // '$' 'ft-option'
     || lk == 74271                 // '$' 'function'
     || lk == 74783                 // '$' 'ge'
     || lk == 75807                 // '$' 'group'
     || lk == 76831                 // '$' 'gt'
     || lk == 77343                 // '$' 'idiv'
     || lk == 77855                 // '$' 'if'
     || lk == 78367                 // '$' 'import'
     || lk == 78879                 // '$' 'in'
     || lk == 79391                 // '$' 'index'
     || lk == 81439                 // '$' 'insert'
     || lk == 81951                 // '$' 'instance'
     || lk == 82463                 // '$' 'integrity'
     || lk == 82975                 // '$' 'intersect'
     || lk == 83487                 // '$' 'into'
     || lk == 83999                 // '$' 'is'
     || lk == 84511                 // '$' 'item'
     || lk == 85023                 // '$' 'json'
     || lk == 85535                 // '$' 'json-item'
     || lk == 87071                 // '$' 'last'
     || lk == 87583                 // '$' 'lax'
     || lk == 88095                 // '$' 'le'
     || lk == 89119                 // '$' 'let'
     || lk == 90143                 // '$' 'loop'
     || lk == 91167                 // '$' 'lt'
     || lk == 92191                 // '$' 'mod'
     || lk == 92703                 // '$' 'modify'
     || lk == 93215                 // '$' 'module'
     || lk == 94239                 // '$' 'namespace'
     || lk == 94751                 // '$' 'namespace-node'
     || lk == 95263                 // '$' 'ne'
     || lk == 97823                 // '$' 'node'
     || lk == 98335                 // '$' 'nodes'
     || lk == 99359                 // '$' 'object'
     || lk == 101407                // '$' 'only'
     || lk == 101919                // '$' 'option'
     || lk == 102431                // '$' 'or'
     || lk == 102943                // '$' 'order'
     || lk == 103455                // '$' 'ordered'
     || lk == 103967                // '$' 'ordering'
     || lk == 105503                // '$' 'parent'
     || lk == 108575                // '$' 'preceding'
     || lk == 109087                // '$' 'preceding-sibling'
     || lk == 110623                // '$' 'processing-instruction'
     || lk == 111647                // '$' 'rename'
     || lk == 112159                // '$' 'replace'
     || lk == 112671                // '$' 'return'
     || lk == 113183                // '$' 'returning'
     || lk == 113695                // '$' 'revalidation'
     || lk == 114719                // '$' 'satisfies'
     || lk == 115231                // '$' 'schema'
     || lk == 115743                // '$' 'schema-attribute'
     || lk == 116255                // '$' 'schema-element'
     || lk == 116767                // '$' 'score'
     || lk == 117279                // '$' 'self'
     || lk == 119839                // '$' 'sliding'
     || lk == 120351                // '$' 'some'
     || lk == 120863                // '$' 'stable'
     || lk == 121375                // '$' 'start'
     || lk == 122911                // '$' 'strict'
     || lk == 123935                // '$' 'structured-item'
     || lk == 124447                // '$' 'switch'
     || lk == 124959                // '$' 'text'
     || lk == 127007                // '$' 'to'
     || lk == 127519                // '$' 'treat'
     || lk == 128031                // '$' 'try'
     || lk == 128543                // '$' 'tumbling'
     || lk == 129055                // '$' 'type'
     || lk == 129567                // '$' 'typeswitch'
     || lk == 130079                // '$' 'union'
     || lk == 131103                // '$' 'unordered'
     || lk == 131615                // '$' 'updating'
     || lk == 133151                // '$' 'validate'
     || lk == 133663                // '$' 'value'
     || lk == 134175                // '$' 'variable'
     || lk == 134687                // '$' 'version'
     || lk == 136223                // '$' 'where'
     || lk == 136735                // '$' 'while'
     || lk == 138271                // '$' 'with'
     || lk == 140319)               // '$' 'xquery'
    {
      lk = memoized(2, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2;
        try
        {
          try_GroupingVariable();
          lookahead1W(182);         // S^WS | '(:' | ',' | ':=' | 'as' | 'collation' | 'count' | 'for' | 'group' |
          if (l1 == 52              // ':='
           || l1 == 79)             // 'as'
          {
            if (l1 == 79)           // 'as'
            {
              try_TypeDeclaration();
            }
            lookahead1W(27);        // S^WS | '(:' | ':='
            shiftT(52);             // ':='
            lookahead1W(266);       // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
            try_ExprSingle();
          }
          if (l1 == 94)             // 'collation'
          {
            shiftT(94);             // 'collation'
            lookahead1W(15);        // URILiteral | S^WS | '(:'
            shiftT(7);              // URILiteral
          }
          memoize(2, e0A, -1);
          lk = -3;
        }
        catch (p1A)
        {
          lk = -2;
          b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
          b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
          b2 = b2A; e2 = e2A; end = e2A; }}
          memoize(2, e0A, -2);
        }
      }
    }
    switch (lk)
    {
    case -1:
      try_GroupingVariable();
      lookahead1W(182);             // S^WS | '(:' | ',' | ':=' | 'as' | 'collation' | 'count' | 'for' | 'group' |
      if (l1 == 52                  // ':='
       || l1 == 79)                 // 'as'
      {
        if (l1 == 79)               // 'as'
        {
          try_TypeDeclaration();
        }
        lookahead1W(27);            // S^WS | '(:' | ':='
        shiftT(52);                 // ':='
        lookahead1W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        try_ExprSingle();
      }
      if (l1 == 94)                 // 'collation'
      {
        shiftT(94);                 // 'collation'
        lookahead1W(15);            // URILiteral | S^WS | '(:'
        shiftT(7);                  // URILiteral
      }
      break;
    case -3:
      break;
    default:
      try_ExprSingle();
    }
  }