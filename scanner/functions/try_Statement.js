function try_Statement()
  {
    switch (l1)
    {
    case 132:                       // 'exit'
      lookahead2W(188);             // S^WS | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | '-' | '/' | '//' | ';' | '<' |
      break;
    case 137:                       // 'for'
      lookahead2W(195);             // S^WS | '!' | '!=' | '#' | '$' | '(' | '(:' | '*' | '+' | '-' | '/' | '//' | ';' |
      break;
    case 174:                       // 'let'
      lookahead2W(192);             // S^WS | '!' | '!=' | '#' | '$' | '(' | '(:' | '*' | '+' | '-' | '/' | '//' | ';' |
      break;
    case 250:                       // 'try'
      lookahead2W(189);             // S^WS | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | '-' | '/' | '//' | ';' | '<' |
      break;
    case 262:                       // 'variable'
      lookahead2W(186);             // S^WS | '!' | '!=' | '#' | '$' | '(' | '(:' | '*' | '+' | '-' | '/' | '//' | ';' |
      break;
    case 276:                       // '{'
      lookahead2W(276);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      break;
    case 31:                        // '$'
    case 32:                        // '%'
      lookahead2W(254);             // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
      break;
    case 86:                        // 'break'
    case 102:                       // 'continue'
      lookahead2W(187);             // S^WS | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | '-' | '/' | '//' | ';' | '<' |
      break;
    case 152:                       // 'if'
    case 243:                       // 'switch'
    case 253:                       // 'typeswitch'
    case 267:                       // 'while'
      lookahead2W(184);             // S^WS | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | '-' | '/' | '//' | ';' | '<' |
      break;
    default:
      lk = l1;
    }
    if (lk == 2836                  // '{' Wildcard
     || lk == 3103                  // '$' EQName^Token
     || lk == 3104                  // '%' EQName^Token
     || lk == 3348                  // '{' EQName^Token
     || lk == 4372                  // '{' IntegerLiteral
     || lk == 4884                  // '{' DecimalLiteral
     || lk == 5396                  // '{' DoubleLiteral
     || lk == 5908                  // '{' StringLiteral
     || lk == 16148                 // '{' '$'
     || lk == 16660                 // '{' '%'
     || lk == 17675                 // 'while' '('
     || lk == 17684                 // '{' '('
     || lk == 18196                 // '{' '(#'
     || lk == 20756                 // '{' '+'
     || lk == 21780                 // '{' '-'
     || lk == 22804                 // '{' '.'
     || lk == 23316                 // '{' '..'
     || lk == 23828                 // '{' '/'
     || lk == 24340                 // '{' '//'
     || lk == 27412                 // '{' ';'
     || lk == 27924                 // '{' '<'
     || lk == 28436                 // '{' '<!--'
     || lk == 30484                 // '{' '<?'
     || lk == 34068                 // '{' '@'
     || lk == 35092                 // '{' '['
     || lk == 35871                 // '$' 'after'
     || lk == 35872                 // '%' 'after'
     || lk == 36116                 // '{' 'after'
     || lk == 36895                 // '$' 'allowing'
     || lk == 36896                 // '%' 'allowing'
     || lk == 37140                 // '{' 'allowing'
     || lk == 37407                 // '$' 'ancestor'
     || lk == 37408                 // '%' 'ancestor'
     || lk == 37652                 // '{' 'ancestor'
     || lk == 37919                 // '$' 'ancestor-or-self'
     || lk == 37920                 // '%' 'ancestor-or-self'
     || lk == 38164                 // '{' 'ancestor-or-self'
     || lk == 38431                 // '$' 'and'
     || lk == 38432                 // '%' 'and'
     || lk == 38676                 // '{' 'and'
     || lk == 39455                 // '$' 'append'
     || lk == 39456                 // '%' 'append'
     || lk == 39700                 // '{' 'append'
     || lk == 39967                 // '$' 'array'
     || lk == 39968                 // '%' 'array'
     || lk == 40212                 // '{' 'array'
     || lk == 40479                 // '$' 'as'
     || lk == 40480                 // '%' 'as'
     || lk == 40724                 // '{' 'as'
     || lk == 40991                 // '$' 'ascending'
     || lk == 40992                 // '%' 'ascending'
     || lk == 41236                 // '{' 'ascending'
     || lk == 41503                 // '$' 'at'
     || lk == 41504                 // '%' 'at'
     || lk == 41748                 // '{' 'at'
     || lk == 42015                 // '$' 'attribute'
     || lk == 42016                 // '%' 'attribute'
     || lk == 42260                 // '{' 'attribute'
     || lk == 42527                 // '$' 'base-uri'
     || lk == 42528                 // '%' 'base-uri'
     || lk == 42772                 // '{' 'base-uri'
     || lk == 43039                 // '$' 'before'
     || lk == 43040                 // '%' 'before'
     || lk == 43284                 // '{' 'before'
     || lk == 43551                 // '$' 'boundary-space'
     || lk == 43552                 // '%' 'boundary-space'
     || lk == 43796                 // '{' 'boundary-space'
     || lk == 44063                 // '$' 'break'
     || lk == 44064                 // '%' 'break'
     || lk == 44308                 // '{' 'break'
     || lk == 45087                 // '$' 'case'
     || lk == 45088                 // '%' 'case'
     || lk == 45332                 // '{' 'case'
     || lk == 45599                 // '$' 'cast'
     || lk == 45600                 // '%' 'cast'
     || lk == 45844                 // '{' 'cast'
     || lk == 46111                 // '$' 'castable'
     || lk == 46112                 // '%' 'castable'
     || lk == 46356                 // '{' 'castable'
     || lk == 46623                 // '$' 'catch'
     || lk == 46624                 // '%' 'catch'
     || lk == 46868                 // '{' 'catch'
     || lk == 47647                 // '$' 'child'
     || lk == 47648                 // '%' 'child'
     || lk == 47892                 // '{' 'child'
     || lk == 48159                 // '$' 'collation'
     || lk == 48160                 // '%' 'collation'
     || lk == 48404                 // '{' 'collation'
     || lk == 49183                 // '$' 'comment'
     || lk == 49184                 // '%' 'comment'
     || lk == 49428                 // '{' 'comment'
     || lk == 49695                 // '$' 'constraint'
     || lk == 49696                 // '%' 'constraint'
     || lk == 49940                 // '{' 'constraint'
     || lk == 50207                 // '$' 'construction'
     || lk == 50208                 // '%' 'construction'
     || lk == 50452                 // '{' 'construction'
     || lk == 51743                 // '$' 'context'
     || lk == 51744                 // '%' 'context'
     || lk == 51988                 // '{' 'context'
     || lk == 52255                 // '$' 'continue'
     || lk == 52256                 // '%' 'continue'
     || lk == 52500                 // '{' 'continue'
     || lk == 52767                 // '$' 'copy'
     || lk == 52768                 // '%' 'copy'
     || lk == 53012                 // '{' 'copy'
     || lk == 53279                 // '$' 'copy-namespaces'
     || lk == 53280                 // '%' 'copy-namespaces'
     || lk == 53524                 // '{' 'copy-namespaces'
     || lk == 53791                 // '$' 'count'
     || lk == 53792                 // '%' 'count'
     || lk == 54036                 // '{' 'count'
     || lk == 54303                 // '$' 'decimal-format'
     || lk == 54304                 // '%' 'decimal-format'
     || lk == 54548                 // '{' 'decimal-format'
     || lk == 55327                 // '$' 'declare'
     || lk == 55328                 // '%' 'declare'
     || lk == 55572                 // '{' 'declare'
     || lk == 55839                 // '$' 'default'
     || lk == 55840                 // '%' 'default'
     || lk == 56084                 // '{' 'default'
     || lk == 56351                 // '$' 'delete'
     || lk == 56352                 // '%' 'delete'
     || lk == 56596                 // '{' 'delete'
     || lk == 56863                 // '$' 'descendant'
     || lk == 56864                 // '%' 'descendant'
     || lk == 57108                 // '{' 'descendant'
     || lk == 57375                 // '$' 'descendant-or-self'
     || lk == 57376                 // '%' 'descendant-or-self'
     || lk == 57620                 // '{' 'descendant-or-self'
     || lk == 57887                 // '$' 'descending'
     || lk == 57888                 // '%' 'descending'
     || lk == 58132                 // '{' 'descending'
     || lk == 60447                 // '$' 'div'
     || lk == 60448                 // '%' 'div'
     || lk == 60692                 // '{' 'div'
     || lk == 60959                 // '$' 'document'
     || lk == 60960                 // '%' 'document'
     || lk == 61204                 // '{' 'document'
     || lk == 61471                 // '$' 'document-node'
     || lk == 61472                 // '%' 'document-node'
     || lk == 61716                 // '{' 'document-node'
     || lk == 61983                 // '$' 'element'
     || lk == 61984                 // '%' 'element'
     || lk == 62228                 // '{' 'element'
     || lk == 62495                 // '$' 'else'
     || lk == 62496                 // '%' 'else'
     || lk == 62740                 // '{' 'else'
     || lk == 63007                 // '$' 'empty'
     || lk == 63008                 // '%' 'empty'
     || lk == 63252                 // '{' 'empty'
     || lk == 63519                 // '$' 'empty-sequence'
     || lk == 63520                 // '%' 'empty-sequence'
     || lk == 63764                 // '{' 'empty-sequence'
     || lk == 64031                 // '$' 'encoding'
     || lk == 64032                 // '%' 'encoding'
     || lk == 64276                 // '{' 'encoding'
     || lk == 64543                 // '$' 'end'
     || lk == 64544                 // '%' 'end'
     || lk == 64788                 // '{' 'end'
     || lk == 65567                 // '$' 'eq'
     || lk == 65568                 // '%' 'eq'
     || lk == 65812                 // '{' 'eq'
     || lk == 66079                 // '$' 'every'
     || lk == 66080                 // '%' 'every'
     || lk == 66324                 // '{' 'every'
     || lk == 67103                 // '$' 'except'
     || lk == 67104                 // '%' 'except'
     || lk == 67348                 // '{' 'except'
     || lk == 67615                 // '$' 'exit'
     || lk == 67616                 // '%' 'exit'
     || lk == 67860                 // '{' 'exit'
     || lk == 68127                 // '$' 'external'
     || lk == 68128                 // '%' 'external'
     || lk == 68372                 // '{' 'external'
     || lk == 68639                 // '$' 'first'
     || lk == 68640                 // '%' 'first'
     || lk == 68884                 // '{' 'first'
     || lk == 69151                 // '$' 'following'
     || lk == 69152                 // '%' 'following'
     || lk == 69396                 // '{' 'following'
     || lk == 69663                 // '$' 'following-sibling'
     || lk == 69664                 // '%' 'following-sibling'
     || lk == 69908                 // '{' 'following-sibling'
     || lk == 70175                 // '$' 'for'
     || lk == 70176                 // '%' 'for'
     || lk == 70420                 // '{' 'for'
     || lk == 72223                 // '$' 'ft-option'
     || lk == 72224                 // '%' 'ft-option'
     || lk == 72468                 // '{' 'ft-option'
     || lk == 74271                 // '$' 'function'
     || lk == 74272                 // '%' 'function'
     || lk == 74516                 // '{' 'function'
     || lk == 74783                 // '$' 'ge'
     || lk == 74784                 // '%' 'ge'
     || lk == 75028                 // '{' 'ge'
     || lk == 75807                 // '$' 'group'
     || lk == 75808                 // '%' 'group'
     || lk == 76052                 // '{' 'group'
     || lk == 76831                 // '$' 'gt'
     || lk == 76832                 // '%' 'gt'
     || lk == 77076                 // '{' 'gt'
     || lk == 77343                 // '$' 'idiv'
     || lk == 77344                 // '%' 'idiv'
     || lk == 77588                 // '{' 'idiv'
     || lk == 77855                 // '$' 'if'
     || lk == 77856                 // '%' 'if'
     || lk == 78100                 // '{' 'if'
     || lk == 78367                 // '$' 'import'
     || lk == 78368                 // '%' 'import'
     || lk == 78612                 // '{' 'import'
     || lk == 78879                 // '$' 'in'
     || lk == 78880                 // '%' 'in'
     || lk == 79124                 // '{' 'in'
     || lk == 79391                 // '$' 'index'
     || lk == 79392                 // '%' 'index'
     || lk == 79636                 // '{' 'index'
     || lk == 81439                 // '$' 'insert'
     || lk == 81440                 // '%' 'insert'
     || lk == 81684                 // '{' 'insert'
     || lk == 81951                 // '$' 'instance'
     || lk == 81952                 // '%' 'instance'
     || lk == 82196                 // '{' 'instance'
     || lk == 82463                 // '$' 'integrity'
     || lk == 82464                 // '%' 'integrity'
     || lk == 82708                 // '{' 'integrity'
     || lk == 82975                 // '$' 'intersect'
     || lk == 82976                 // '%' 'intersect'
     || lk == 83220                 // '{' 'intersect'
     || lk == 83487                 // '$' 'into'
     || lk == 83488                 // '%' 'into'
     || lk == 83732                 // '{' 'into'
     || lk == 83999                 // '$' 'is'
     || lk == 84000                 // '%' 'is'
     || lk == 84244                 // '{' 'is'
     || lk == 84511                 // '$' 'item'
     || lk == 84512                 // '%' 'item'
     || lk == 84756                 // '{' 'item'
     || lk == 85023                 // '$' 'json'
     || lk == 85024                 // '%' 'json'
     || lk == 85268                 // '{' 'json'
     || lk == 85535                 // '$' 'json-item'
     || lk == 85536                 // '%' 'json-item'
     || lk == 85780                 // '{' 'json-item'
     || lk == 87071                 // '$' 'last'
     || lk == 87072                 // '%' 'last'
     || lk == 87316                 // '{' 'last'
     || lk == 87583                 // '$' 'lax'
     || lk == 87584                 // '%' 'lax'
     || lk == 87828                 // '{' 'lax'
     || lk == 88095                 // '$' 'le'
     || lk == 88096                 // '%' 'le'
     || lk == 88340                 // '{' 'le'
     || lk == 89119                 // '$' 'let'
     || lk == 89120                 // '%' 'let'
     || lk == 89364                 // '{' 'let'
     || lk == 90143                 // '$' 'loop'
     || lk == 90144                 // '%' 'loop'
     || lk == 90388                 // '{' 'loop'
     || lk == 91167                 // '$' 'lt'
     || lk == 91168                 // '%' 'lt'
     || lk == 91412                 // '{' 'lt'
     || lk == 92191                 // '$' 'mod'
     || lk == 92192                 // '%' 'mod'
     || lk == 92436                 // '{' 'mod'
     || lk == 92703                 // '$' 'modify'
     || lk == 92704                 // '%' 'modify'
     || lk == 92948                 // '{' 'modify'
     || lk == 93215                 // '$' 'module'
     || lk == 93216                 // '%' 'module'
     || lk == 93460                 // '{' 'module'
     || lk == 94239                 // '$' 'namespace'
     || lk == 94240                 // '%' 'namespace'
     || lk == 94484                 // '{' 'namespace'
     || lk == 94751                 // '$' 'namespace-node'
     || lk == 94752                 // '%' 'namespace-node'
     || lk == 94996                 // '{' 'namespace-node'
     || lk == 95263                 // '$' 'ne'
     || lk == 95264                 // '%' 'ne'
     || lk == 95508                 // '{' 'ne'
     || lk == 97823                 // '$' 'node'
     || lk == 97824                 // '%' 'node'
     || lk == 98068                 // '{' 'node'
     || lk == 98335                 // '$' 'nodes'
     || lk == 98336                 // '%' 'nodes'
     || lk == 98580                 // '{' 'nodes'
     || lk == 99359                 // '$' 'object'
     || lk == 99360                 // '%' 'object'
     || lk == 99604                 // '{' 'object'
     || lk == 101407                // '$' 'only'
     || lk == 101408                // '%' 'only'
     || lk == 101652                // '{' 'only'
     || lk == 101919                // '$' 'option'
     || lk == 101920                // '%' 'option'
     || lk == 102164                // '{' 'option'
     || lk == 102431                // '$' 'or'
     || lk == 102432                // '%' 'or'
     || lk == 102676                // '{' 'or'
     || lk == 102943                // '$' 'order'
     || lk == 102944                // '%' 'order'
     || lk == 103188                // '{' 'order'
     || lk == 103455                // '$' 'ordered'
     || lk == 103456                // '%' 'ordered'
     || lk == 103700                // '{' 'ordered'
     || lk == 103967                // '$' 'ordering'
     || lk == 103968                // '%' 'ordering'
     || lk == 104212                // '{' 'ordering'
     || lk == 105503                // '$' 'parent'
     || lk == 105504                // '%' 'parent'
     || lk == 105748                // '{' 'parent'
     || lk == 108575                // '$' 'preceding'
     || lk == 108576                // '%' 'preceding'
     || lk == 108820                // '{' 'preceding'
     || lk == 109087                // '$' 'preceding-sibling'
     || lk == 109088                // '%' 'preceding-sibling'
     || lk == 109332                // '{' 'preceding-sibling'
     || lk == 110623                // '$' 'processing-instruction'
     || lk == 110624                // '%' 'processing-instruction'
     || lk == 110868                // '{' 'processing-instruction'
     || lk == 111647                // '$' 'rename'
     || lk == 111648                // '%' 'rename'
     || lk == 111892                // '{' 'rename'
     || lk == 112159                // '$' 'replace'
     || lk == 112160                // '%' 'replace'
     || lk == 112404                // '{' 'replace'
     || lk == 112671                // '$' 'return'
     || lk == 112672                // '%' 'return'
     || lk == 112916                // '{' 'return'
     || lk == 113183                // '$' 'returning'
     || lk == 113184                // '%' 'returning'
     || lk == 113428                // '{' 'returning'
     || lk == 113695                // '$' 'revalidation'
     || lk == 113696                // '%' 'revalidation'
     || lk == 113940                // '{' 'revalidation'
     || lk == 114719                // '$' 'satisfies'
     || lk == 114720                // '%' 'satisfies'
     || lk == 114964                // '{' 'satisfies'
     || lk == 115231                // '$' 'schema'
     || lk == 115232                // '%' 'schema'
     || lk == 115476                // '{' 'schema'
     || lk == 115743                // '$' 'schema-attribute'
     || lk == 115744                // '%' 'schema-attribute'
     || lk == 115988                // '{' 'schema-attribute'
     || lk == 116255                // '$' 'schema-element'
     || lk == 116256                // '%' 'schema-element'
     || lk == 116500                // '{' 'schema-element'
     || lk == 116767                // '$' 'score'
     || lk == 116768                // '%' 'score'
     || lk == 117012                // '{' 'score'
     || lk == 117279                // '$' 'self'
     || lk == 117280                // '%' 'self'
     || lk == 117524                // '{' 'self'
     || lk == 119839                // '$' 'sliding'
     || lk == 119840                // '%' 'sliding'
     || lk == 120084                // '{' 'sliding'
     || lk == 120351                // '$' 'some'
     || lk == 120352                // '%' 'some'
     || lk == 120596                // '{' 'some'
     || lk == 120863                // '$' 'stable'
     || lk == 120864                // '%' 'stable'
     || lk == 121108                // '{' 'stable'
     || lk == 121375                // '$' 'start'
     || lk == 121376                // '%' 'start'
     || lk == 121620                // '{' 'start'
     || lk == 122911                // '$' 'strict'
     || lk == 122912                // '%' 'strict'
     || lk == 123156                // '{' 'strict'
     || lk == 123935                // '$' 'structured-item'
     || lk == 123936                // '%' 'structured-item'
     || lk == 124180                // '{' 'structured-item'
     || lk == 124447                // '$' 'switch'
     || lk == 124448                // '%' 'switch'
     || lk == 124692                // '{' 'switch'
     || lk == 124959                // '$' 'text'
     || lk == 124960                // '%' 'text'
     || lk == 125204                // '{' 'text'
     || lk == 127007                // '$' 'to'
     || lk == 127008                // '%' 'to'
     || lk == 127252                // '{' 'to'
     || lk == 127519                // '$' 'treat'
     || lk == 127520                // '%' 'treat'
     || lk == 127764                // '{' 'treat'
     || lk == 128031                // '$' 'try'
     || lk == 128032                // '%' 'try'
     || lk == 128276                // '{' 'try'
     || lk == 128543                // '$' 'tumbling'
     || lk == 128544                // '%' 'tumbling'
     || lk == 128788                // '{' 'tumbling'
     || lk == 129055                // '$' 'type'
     || lk == 129056                // '%' 'type'
     || lk == 129300                // '{' 'type'
     || lk == 129567                // '$' 'typeswitch'
     || lk == 129568                // '%' 'typeswitch'
     || lk == 129812                // '{' 'typeswitch'
     || lk == 130079                // '$' 'union'
     || lk == 130080                // '%' 'union'
     || lk == 130324                // '{' 'union'
     || lk == 131103                // '$' 'unordered'
     || lk == 131104                // '%' 'unordered'
     || lk == 131348                // '{' 'unordered'
     || lk == 131615                // '$' 'updating'
     || lk == 131616                // '%' 'updating'
     || lk == 131860                // '{' 'updating'
     || lk == 133151                // '$' 'validate'
     || lk == 133152                // '%' 'validate'
     || lk == 133396                // '{' 'validate'
     || lk == 133663                // '$' 'value'
     || lk == 133664                // '%' 'value'
     || lk == 133908                // '{' 'value'
     || lk == 134175                // '$' 'variable'
     || lk == 134176                // '%' 'variable'
     || lk == 134420                // '{' 'variable'
     || lk == 134687                // '$' 'version'
     || lk == 134688                // '%' 'version'
     || lk == 134932                // '{' 'version'
     || lk == 136223                // '$' 'where'
     || lk == 136224                // '%' 'where'
     || lk == 136468                // '{' 'where'
     || lk == 136735                // '$' 'while'
     || lk == 136736                // '%' 'while'
     || lk == 136980                // '{' 'while'
     || lk == 138271                // '$' 'with'
     || lk == 138272                // '%' 'with'
     || lk == 138516                // '{' 'with'
     || lk == 140319                // '$' 'xquery'
     || lk == 140320                // '%' 'xquery'
     || lk == 140564                // '{' 'xquery'
     || lk == 141588                // '{' '{'
     || lk == 142612                // '{' '{|'
     || lk == 144660)               // '{' '}'
    {
      lk = memoized(7, e0);
      if (lk == 0)
      {
        var b0A = b0; var e0A = e0; var l1A = l1;
        var b1A = b1; var e1A = e1; var l2A = l2;
        var b2A = b2; var e2A = e2;
        try
        {
          try_ApplyStatement();
          memoize(7, e0A, -1);
          lk = -15;
        }
        catch (p1A)
        {
          try
          {
            b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
            b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
            b2 = b2A; e2 = e2A; end = e2A; }}
            try_AssignStatement();
            memoize(7, e0A, -2);
            lk = -15;
          }
          catch (p2A)
          {
            try
            {
              b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
              b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
              b2 = b2A; e2 = e2A; end = e2A; }}
              try_BlockStatement();
              memoize(7, e0A, -3);
              lk = -15;
            }
            catch (p3A)
            {
              try
              {
                b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
                b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
                b2 = b2A; e2 = e2A; end = e2A; }}
                try_VarDeclStatement();
                memoize(7, e0A, -12);
                lk = -15;
              }
              catch (p12A)
              {
                lk = -13;
                b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
                b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
                b2 = b2A; e2 = e2A; end = e2A; }}
                memoize(7, e0A, -13);
              }
            }
          }
        }
      }
    }
    switch (lk)
    {
    case -2:
      try_AssignStatement();
      break;
    case -3:
      try_BlockStatement();
      break;
    case 90198:                     // 'break' 'loop'
      try_BreakStatement();
      break;
    case 90214:                     // 'continue' 'loop'
      try_ContinueStatement();
      break;
    case 113284:                    // 'exit' 'returning'
      try_ExitStatement();
      break;
    case 16009:                     // 'for' '$'
    case 16046:                     // 'let' '$'
    case 116910:                    // 'let' 'score'
    case 119945:                    // 'for' 'sliding'
    case 128649:                    // 'for' 'tumbling'
      try_FLWORStatement();
      break;
    case 17560:                     // 'if' '('
      try_IfStatement();
      break;
    case 17651:                     // 'switch' '('
      try_SwitchStatement();
      break;
    case 141562:                    // 'try' '{'
      try_TryCatchStatement();
      break;
    case 17661:                     // 'typeswitch' '('
      try_TypeswitchStatement();
      break;
    case -12:
    case 16134:                     // 'variable' '$'
      try_VarDeclStatement();
      break;
    case -13:
      try_WhileStatement();
      break;
    case 53:                        // ';'
      try_VoidStatement();
      break;
    case -15:
      break;
    default:
      try_ApplyStatement();
    }
  }