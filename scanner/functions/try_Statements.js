function try_Statements()
  {
    for (;;)
    {
      lookahead1W(277);             // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
      switch (l1)
      {
      case 34:                      // '('
        lookahead2W(268);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        break;
      case 35:                      // '(#'
        lookahead2(251);            // EQName^Token | S | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' |
        break;
      case 46:                      // '/'
        lookahead2W(283);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        break;
      case 47:                      // '//'
        lookahead2W(264);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        break;
      case 54:                      // '<'
        lookahead2(4);              // QName
        break;
      case 55:                      // '<!--'
        lookahead2(1);              // DirCommentContents
        break;
      case 59:                      // '<?'
        lookahead2(3);              // PITarget
        break;
      case 66:                      // '@'
        lookahead2W(256);           // Wildcard | EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
        break;
      case 68:                      // '['
        lookahead2W(271);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        break;
      case 77:                      // 'append'
        lookahead2W(199);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 82:                      // 'attribute'
        lookahead2W(280);           // EQName^Token | S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' |
        break;
      case 121:                     // 'element'
        lookahead2W(279);           // EQName^Token | S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' |
        break;
      case 132:                     // 'exit'
        lookahead2W(202);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 137:                     // 'for'
        lookahead2W(207);           // S^WS | EOF | '!' | '!=' | '#' | '$' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' |
        break;
      case 174:                     // 'let'
        lookahead2W(204);           // S^WS | EOF | '!' | '!=' | '#' | '$' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' |
        break;
      case 218:                     // 'rename'
        lookahead2W(205);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 219:                     // 'replace'
        lookahead2W(206);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 260:                     // 'validate'
        lookahead2W(209);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 276:                     // '{'
        lookahead2W(276);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        break;
      case 278:                     // '{|'
        lookahead2W(272);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        break;
      case 5:                       // Wildcard
      case 45:                      // '..'
        lookahead2W(185);           // S^WS | EOF | '!' | '!=' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' | ';' | '<' |
        break;
      case 31:                      // '$'
      case 32:                      // '%'
        lookahead2W(254);           // EQName^Token | S^WS | '(:' | 'after' | 'allowing' | 'ancestor' |
        break;
      case 40:                      // '+'
      case 42:                      // '-'
        lookahead2W(266);           // Wildcard | EQName^Token | IntegerLiteral | DecimalLiteral | DoubleLiteral |
        break;
      case 86:                      // 'break'
      case 102:                     // 'continue'
        lookahead2W(200);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 110:                     // 'delete'
      case 159:                     // 'insert'
        lookahead2W(208);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 184:                     // 'namespace'
      case 216:                     // 'processing-instruction'
        lookahead2W(267);           // NCName^Token | S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' |
        break;
      case 103:                     // 'copy'
      case 129:                     // 'every'
      case 235:                     // 'some'
      case 262:                     // 'variable'
        lookahead2W(196);           // S^WS | EOF | '!' | '!=' | '#' | '$' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' |
        break;
      case 8:                       // IntegerLiteral
      case 9:                       // DecimalLiteral
      case 10:                      // DoubleLiteral
      case 11:                      // StringLiteral
      case 44:                      // '.'
        lookahead2W(191);           // S^WS | EOF | '!' | '!=' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' | ';' |
        break;
      case 78:                      // 'array'
      case 124:                     // 'empty-sequence'
      case 165:                     // 'item'
      case 167:                     // 'json-item'
      case 242:                     // 'structured-item'
        lookahead2W(190);           // S^WS | EOF | '!' | '!=' | '#' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' | ';' |
        break;
      case 96:                      // 'comment'
      case 119:                     // 'document'
      case 202:                     // 'ordered'
      case 244:                     // 'text'
      case 250:                     // 'try'
      case 256:                     // 'unordered'
        lookahead2W(203);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 73:                      // 'ancestor'
      case 74:                      // 'ancestor-or-self'
      case 93:                      // 'child'
      case 111:                     // 'descendant'
      case 112:                     // 'descendant-or-self'
      case 135:                     // 'following'
      case 136:                     // 'following-sibling'
      case 206:                     // 'parent'
      case 212:                     // 'preceding'
      case 213:                     // 'preceding-sibling'
      case 229:                     // 'self'
        lookahead2W(197);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      case 6:                       // EQName^Token
      case 70:                      // 'after'
      case 72:                      // 'allowing'
      case 75:                      // 'and'
      case 79:                      // 'as'
      case 80:                      // 'ascending'
      case 81:                      // 'at'
      case 83:                      // 'base-uri'
      case 84:                      // 'before'
      case 85:                      // 'boundary-space'
      case 88:                      // 'case'
      case 89:                      // 'cast'
      case 90:                      // 'castable'
      case 91:                      // 'catch'
      case 94:                      // 'collation'
      case 97:                      // 'constraint'
      case 98:                      // 'construction'
      case 101:                     // 'context'
      case 104:                     // 'copy-namespaces'
      case 105:                     // 'count'
      case 106:                     // 'decimal-format'
      case 108:                     // 'declare'
      case 109:                     // 'default'
      case 113:                     // 'descending'
      case 118:                     // 'div'
      case 120:                     // 'document-node'
      case 122:                     // 'else'
      case 123:                     // 'empty'
      case 125:                     // 'encoding'
      case 126:                     // 'end'
      case 128:                     // 'eq'
      case 131:                     // 'except'
      case 133:                     // 'external'
      case 134:                     // 'first'
      case 141:                     // 'ft-option'
      case 145:                     // 'function'
      case 146:                     // 'ge'
      case 148:                     // 'group'
      case 150:                     // 'gt'
      case 151:                     // 'idiv'
      case 152:                     // 'if'
      case 153:                     // 'import'
      case 154:                     // 'in'
      case 155:                     // 'index'
      case 160:                     // 'instance'
      case 161:                     // 'integrity'
      case 162:                     // 'intersect'
      case 163:                     // 'into'
      case 164:                     // 'is'
      case 166:                     // 'json'
      case 170:                     // 'last'
      case 171:                     // 'lax'
      case 172:                     // 'le'
      case 176:                     // 'loop'
      case 178:                     // 'lt'
      case 180:                     // 'mod'
      case 181:                     // 'modify'
      case 182:                     // 'module'
      case 185:                     // 'namespace-node'
      case 186:                     // 'ne'
      case 191:                     // 'node'
      case 192:                     // 'nodes'
      case 194:                     // 'object'
      case 198:                     // 'only'
      case 199:                     // 'option'
      case 200:                     // 'or'
      case 201:                     // 'order'
      case 203:                     // 'ordering'
      case 220:                     // 'return'
      case 221:                     // 'returning'
      case 222:                     // 'revalidation'
      case 224:                     // 'satisfies'
      case 225:                     // 'schema'
      case 226:                     // 'schema-attribute'
      case 227:                     // 'schema-element'
      case 228:                     // 'score'
      case 234:                     // 'sliding'
      case 236:                     // 'stable'
      case 237:                     // 'start'
      case 240:                     // 'strict'
      case 243:                     // 'switch'
      case 248:                     // 'to'
      case 249:                     // 'treat'
      case 251:                     // 'tumbling'
      case 252:                     // 'type'
      case 253:                     // 'typeswitch'
      case 254:                     // 'union'
      case 257:                     // 'updating'
      case 261:                     // 'value'
      case 263:                     // 'version'
      case 266:                     // 'where'
      case 267:                     // 'while'
      case 270:                     // 'with'
      case 274:                     // 'xquery'
        lookahead2W(194);           // S^WS | EOF | '!' | '!=' | '#' | '(' | '(:' | '*' | '+' | ',' | '-' | '/' | '//' |
        break;
      default:
        lk = l1;
      }
      if (lk != 25                  // EOF
       && lk != 53                  // ';'
       && lk != 282                 // '}'
       && lk != 12805               // Wildcard EOF
       && lk != 12806               // EQName^Token EOF
       && lk != 12808               // IntegerLiteral EOF
       && lk != 12809               // DecimalLiteral EOF
       && lk != 12810               // DoubleLiteral EOF
       && lk != 12811               // StringLiteral EOF
       && lk != 12844               // '.' EOF
       && lk != 12845               // '..' EOF
       && lk != 12846               // '/' EOF
       && lk != 12870               // 'after' EOF
       && lk != 12872               // 'allowing' EOF
       && lk != 12873               // 'ancestor' EOF
       && lk != 12874               // 'ancestor-or-self' EOF
       && lk != 12875               // 'and' EOF
       && lk != 12877               // 'append' EOF
       && lk != 12878               // 'array' EOF
       && lk != 12879               // 'as' EOF
       && lk != 12880               // 'ascending' EOF
       && lk != 12881               // 'at' EOF
       && lk != 12882               // 'attribute' EOF
       && lk != 12883               // 'base-uri' EOF
       && lk != 12884               // 'before' EOF
       && lk != 12885               // 'boundary-space' EOF
       && lk != 12886               // 'break' EOF
       && lk != 12888               // 'case' EOF
       && lk != 12889               // 'cast' EOF
       && lk != 12890               // 'castable' EOF
       && lk != 12891               // 'catch' EOF
       && lk != 12893               // 'child' EOF
       && lk != 12894               // 'collation' EOF
       && lk != 12896               // 'comment' EOF
       && lk != 12897               // 'constraint' EOF
       && lk != 12898               // 'construction' EOF
       && lk != 12901               // 'context' EOF
       && lk != 12902               // 'continue' EOF
       && lk != 12903               // 'copy' EOF
       && lk != 12904               // 'copy-namespaces' EOF
       && lk != 12905               // 'count' EOF
       && lk != 12906               // 'decimal-format' EOF
       && lk != 12908               // 'declare' EOF
       && lk != 12909               // 'default' EOF
       && lk != 12910               // 'delete' EOF
       && lk != 12911               // 'descendant' EOF
       && lk != 12912               // 'descendant-or-self' EOF
       && lk != 12913               // 'descending' EOF
       && lk != 12918               // 'div' EOF
       && lk != 12919               // 'document' EOF
       && lk != 12920               // 'document-node' EOF
       && lk != 12921               // 'element' EOF
       && lk != 12922               // 'else' EOF
       && lk != 12923               // 'empty' EOF
       && lk != 12924               // 'empty-sequence' EOF
       && lk != 12925               // 'encoding' EOF
       && lk != 12926               // 'end' EOF
       && lk != 12928               // 'eq' EOF
       && lk != 12929               // 'every' EOF
       && lk != 12931               // 'except' EOF
       && lk != 12932               // 'exit' EOF
       && lk != 12933               // 'external' EOF
       && lk != 12934               // 'first' EOF
       && lk != 12935               // 'following' EOF
       && lk != 12936               // 'following-sibling' EOF
       && lk != 12937               // 'for' EOF
       && lk != 12941               // 'ft-option' EOF
       && lk != 12945               // 'function' EOF
       && lk != 12946               // 'ge' EOF
       && lk != 12948               // 'group' EOF
       && lk != 12950               // 'gt' EOF
       && lk != 12951               // 'idiv' EOF
       && lk != 12952               // 'if' EOF
       && lk != 12953               // 'import' EOF
       && lk != 12954               // 'in' EOF
       && lk != 12955               // 'index' EOF
       && lk != 12959               // 'insert' EOF
       && lk != 12960               // 'instance' EOF
       && lk != 12961               // 'integrity' EOF
       && lk != 12962               // 'intersect' EOF
       && lk != 12963               // 'into' EOF
       && lk != 12964               // 'is' EOF
       && lk != 12965               // 'item' EOF
       && lk != 12966               // 'json' EOF
       && lk != 12967               // 'json-item' EOF
       && lk != 12970               // 'last' EOF
       && lk != 12971               // 'lax' EOF
       && lk != 12972               // 'le' EOF
       && lk != 12974               // 'let' EOF
       && lk != 12976               // 'loop' EOF
       && lk != 12978               // 'lt' EOF
       && lk != 12980               // 'mod' EOF
       && lk != 12981               // 'modify' EOF
       && lk != 12982               // 'module' EOF
       && lk != 12984               // 'namespace' EOF
       && lk != 12985               // 'namespace-node' EOF
       && lk != 12986               // 'ne' EOF
       && lk != 12991               // 'node' EOF
       && lk != 12992               // 'nodes' EOF
       && lk != 12994               // 'object' EOF
       && lk != 12998               // 'only' EOF
       && lk != 12999               // 'option' EOF
       && lk != 13000               // 'or' EOF
       && lk != 13001               // 'order' EOF
       && lk != 13002               // 'ordered' EOF
       && lk != 13003               // 'ordering' EOF
       && lk != 13006               // 'parent' EOF
       && lk != 13012               // 'preceding' EOF
       && lk != 13013               // 'preceding-sibling' EOF
       && lk != 13016               // 'processing-instruction' EOF
       && lk != 13018               // 'rename' EOF
       && lk != 13019               // 'replace' EOF
       && lk != 13020               // 'return' EOF
       && lk != 13021               // 'returning' EOF
       && lk != 13022               // 'revalidation' EOF
       && lk != 13024               // 'satisfies' EOF
       && lk != 13025               // 'schema' EOF
       && lk != 13026               // 'schema-attribute' EOF
       && lk != 13027               // 'schema-element' EOF
       && lk != 13028               // 'score' EOF
       && lk != 13029               // 'self' EOF
       && lk != 13034               // 'sliding' EOF
       && lk != 13035               // 'some' EOF
       && lk != 13036               // 'stable' EOF
       && lk != 13037               // 'start' EOF
       && lk != 13040               // 'strict' EOF
       && lk != 13042               // 'structured-item' EOF
       && lk != 13043               // 'switch' EOF
       && lk != 13044               // 'text' EOF
       && lk != 13048               // 'to' EOF
       && lk != 13049               // 'treat' EOF
       && lk != 13050               // 'try' EOF
       && lk != 13051               // 'tumbling' EOF
       && lk != 13052               // 'type' EOF
       && lk != 13053               // 'typeswitch' EOF
       && lk != 13054               // 'union' EOF
       && lk != 13056               // 'unordered' EOF
       && lk != 13057               // 'updating' EOF
       && lk != 13060               // 'validate' EOF
       && lk != 13061               // 'value' EOF
       && lk != 13062               // 'variable' EOF
       && lk != 13063               // 'version' EOF
       && lk != 13066               // 'where' EOF
       && lk != 13067               // 'while' EOF
       && lk != 13070               // 'with' EOF
       && lk != 13074               // 'xquery' EOF
       && lk != 16134               // 'variable' '$'
       && lk != 20997               // Wildcard ','
       && lk != 20998               // EQName^Token ','
       && lk != 21000               // IntegerLiteral ','
       && lk != 21001               // DecimalLiteral ','
       && lk != 21002               // DoubleLiteral ','
       && lk != 21003               // StringLiteral ','
       && lk != 21036               // '.' ','
       && lk != 21037               // '..' ','
       && lk != 21038               // '/' ','
       && lk != 21062               // 'after' ','
       && lk != 21064               // 'allowing' ','
       && lk != 21065               // 'ancestor' ','
       && lk != 21066               // 'ancestor-or-self' ','
       && lk != 21067               // 'and' ','
       && lk != 21069               // 'append' ','
       && lk != 21070               // 'array' ','
       && lk != 21071               // 'as' ','
       && lk != 21072               // 'ascending' ','
       && lk != 21073               // 'at' ','
       && lk != 21074               // 'attribute' ','
       && lk != 21075               // 'base-uri' ','
       && lk != 21076               // 'before' ','
       && lk != 21077               // 'boundary-space' ','
       && lk != 21078               // 'break' ','
       && lk != 21080               // 'case' ','
       && lk != 21081               // 'cast' ','
       && lk != 21082               // 'castable' ','
       && lk != 21083               // 'catch' ','
       && lk != 21085               // 'child' ','
       && lk != 21086               // 'collation' ','
       && lk != 21088               // 'comment' ','
       && lk != 21089               // 'constraint' ','
       && lk != 21090               // 'construction' ','
       && lk != 21093               // 'context' ','
       && lk != 21094               // 'continue' ','
       && lk != 21095               // 'copy' ','
       && lk != 21096               // 'copy-namespaces' ','
       && lk != 21097               // 'count' ','
       && lk != 21098               // 'decimal-format' ','
       && lk != 21100               // 'declare' ','
       && lk != 21101               // 'default' ','
       && lk != 21102               // 'delete' ','
       && lk != 21103               // 'descendant' ','
       && lk != 21104               // 'descendant-or-self' ','
       && lk != 21105               // 'descending' ','
       && lk != 21110               // 'div' ','
       && lk != 21111               // 'document' ','
       && lk != 21112               // 'document-node' ','
       && lk != 21113               // 'element' ','
       && lk != 21114               // 'else' ','
       && lk != 21115               // 'empty' ','
       && lk != 21116               // 'empty-sequence' ','
       && lk != 21117               // 'encoding' ','
       && lk != 21118               // 'end' ','
       && lk != 21120               // 'eq' ','
       && lk != 21121               // 'every' ','
       && lk != 21123               // 'except' ','
       && lk != 21124               // 'exit' ','
       && lk != 21125               // 'external' ','
       && lk != 21126               // 'first' ','
       && lk != 21127               // 'following' ','
       && lk != 21128               // 'following-sibling' ','
       && lk != 21129               // 'for' ','
       && lk != 21133               // 'ft-option' ','
       && lk != 21137               // 'function' ','
       && lk != 21138               // 'ge' ','
       && lk != 21140               // 'group' ','
       && lk != 21142               // 'gt' ','
       && lk != 21143               // 'idiv' ','
       && lk != 21144               // 'if' ','
       && lk != 21145               // 'import' ','
       && lk != 21146               // 'in' ','
       && lk != 21147               // 'index' ','
       && lk != 21151               // 'insert' ','
       && lk != 21152               // 'instance' ','
       && lk != 21153               // 'integrity' ','
       && lk != 21154               // 'intersect' ','
       && lk != 21155               // 'into' ','
       && lk != 21156               // 'is' ','
       && lk != 21157               // 'item' ','
       && lk != 21158               // 'json' ','
       && lk != 21159               // 'json-item' ','
       && lk != 21162               // 'last' ','
       && lk != 21163               // 'lax' ','
       && lk != 21164               // 'le' ','
       && lk != 21166               // 'let' ','
       && lk != 21168               // 'loop' ','
       && lk != 21170               // 'lt' ','
       && lk != 21172               // 'mod' ','
       && lk != 21173               // 'modify' ','
       && lk != 21174               // 'module' ','
       && lk != 21176               // 'namespace' ','
       && lk != 21177               // 'namespace-node' ','
       && lk != 21178               // 'ne' ','
       && lk != 21183               // 'node' ','
       && lk != 21184               // 'nodes' ','
       && lk != 21186               // 'object' ','
       && lk != 21190               // 'only' ','
       && lk != 21191               // 'option' ','
       && lk != 21192               // 'or' ','
       && lk != 21193               // 'order' ','
       && lk != 21194               // 'ordered' ','
       && lk != 21195               // 'ordering' ','
       && lk != 21198               // 'parent' ','
       && lk != 21204               // 'preceding' ','
       && lk != 21205               // 'preceding-sibling' ','
       && lk != 21208               // 'processing-instruction' ','
       && lk != 21210               // 'rename' ','
       && lk != 21211               // 'replace' ','
       && lk != 21212               // 'return' ','
       && lk != 21213               // 'returning' ','
       && lk != 21214               // 'revalidation' ','
       && lk != 21216               // 'satisfies' ','
       && lk != 21217               // 'schema' ','
       && lk != 21218               // 'schema-attribute' ','
       && lk != 21219               // 'schema-element' ','
       && lk != 21220               // 'score' ','
       && lk != 21221               // 'self' ','
       && lk != 21226               // 'sliding' ','
       && lk != 21227               // 'some' ','
       && lk != 21228               // 'stable' ','
       && lk != 21229               // 'start' ','
       && lk != 21232               // 'strict' ','
       && lk != 21234               // 'structured-item' ','
       && lk != 21235               // 'switch' ','
       && lk != 21236               // 'text' ','
       && lk != 21240               // 'to' ','
       && lk != 21241               // 'treat' ','
       && lk != 21242               // 'try' ','
       && lk != 21243               // 'tumbling' ','
       && lk != 21244               // 'type' ','
       && lk != 21245               // 'typeswitch' ','
       && lk != 21246               // 'union' ','
       && lk != 21248               // 'unordered' ','
       && lk != 21249               // 'updating' ','
       && lk != 21252               // 'validate' ','
       && lk != 21253               // 'value' ','
       && lk != 21254               // 'variable' ','
       && lk != 21255               // 'version' ','
       && lk != 21258               // 'where' ','
       && lk != 21259               // 'while' ','
       && lk != 21262               // 'with' ','
       && lk != 21266               // 'xquery' ','
       && lk != 27141               // Wildcard ';'
       && lk != 27142               // EQName^Token ';'
       && lk != 27144               // IntegerLiteral ';'
       && lk != 27145               // DecimalLiteral ';'
       && lk != 27146               // DoubleLiteral ';'
       && lk != 27147               // StringLiteral ';'
       && lk != 27180               // '.' ';'
       && lk != 27181               // '..' ';'
       && lk != 27182               // '/' ';'
       && lk != 27206               // 'after' ';'
       && lk != 27208               // 'allowing' ';'
       && lk != 27209               // 'ancestor' ';'
       && lk != 27210               // 'ancestor-or-self' ';'
       && lk != 27211               // 'and' ';'
       && lk != 27213               // 'append' ';'
       && lk != 27214               // 'array' ';'
       && lk != 27215               // 'as' ';'
       && lk != 27216               // 'ascending' ';'
       && lk != 27217               // 'at' ';'
       && lk != 27218               // 'attribute' ';'
       && lk != 27219               // 'base-uri' ';'
       && lk != 27220               // 'before' ';'
       && lk != 27221               // 'boundary-space' ';'
       && lk != 27222               // 'break' ';'
       && lk != 27224               // 'case' ';'
       && lk != 27225               // 'cast' ';'
       && lk != 27226               // 'castable' ';'
       && lk != 27227               // 'catch' ';'
       && lk != 27229               // 'child' ';'
       && lk != 27230               // 'collation' ';'
       && lk != 27232               // 'comment' ';'
       && lk != 27233               // 'constraint' ';'
       && lk != 27234               // 'construction' ';'
       && lk != 27237               // 'context' ';'
       && lk != 27238               // 'continue' ';'
       && lk != 27239               // 'copy' ';'
       && lk != 27240               // 'copy-namespaces' ';'
       && lk != 27241               // 'count' ';'
       && lk != 27242               // 'decimal-format' ';'
       && lk != 27244               // 'declare' ';'
       && lk != 27245               // 'default' ';'
       && lk != 27246               // 'delete' ';'
       && lk != 27247               // 'descendant' ';'
       && lk != 27248               // 'descendant-or-self' ';'
       && lk != 27249               // 'descending' ';'
       && lk != 27254               // 'div' ';'
       && lk != 27255               // 'document' ';'
       && lk != 27256               // 'document-node' ';'
       && lk != 27257               // 'element' ';'
       && lk != 27258               // 'else' ';'
       && lk != 27259               // 'empty' ';'
       && lk != 27260               // 'empty-sequence' ';'
       && lk != 27261               // 'encoding' ';'
       && lk != 27262               // 'end' ';'
       && lk != 27264               // 'eq' ';'
       && lk != 27265               // 'every' ';'
       && lk != 27267               // 'except' ';'
       && lk != 27268               // 'exit' ';'
       && lk != 27269               // 'external' ';'
       && lk != 27270               // 'first' ';'
       && lk != 27271               // 'following' ';'
       && lk != 27272               // 'following-sibling' ';'
       && lk != 27273               // 'for' ';'
       && lk != 27277               // 'ft-option' ';'
       && lk != 27281               // 'function' ';'
       && lk != 27282               // 'ge' ';'
       && lk != 27284               // 'group' ';'
       && lk != 27286               // 'gt' ';'
       && lk != 27287               // 'idiv' ';'
       && lk != 27288               // 'if' ';'
       && lk != 27289               // 'import' ';'
       && lk != 27290               // 'in' ';'
       && lk != 27291               // 'index' ';'
       && lk != 27295               // 'insert' ';'
       && lk != 27296               // 'instance' ';'
       && lk != 27297               // 'integrity' ';'
       && lk != 27298               // 'intersect' ';'
       && lk != 27299               // 'into' ';'
       && lk != 27300               // 'is' ';'
       && lk != 27301               // 'item' ';'
       && lk != 27302               // 'json' ';'
       && lk != 27303               // 'json-item' ';'
       && lk != 27306               // 'last' ';'
       && lk != 27307               // 'lax' ';'
       && lk != 27308               // 'le' ';'
       && lk != 27310               // 'let' ';'
       && lk != 27312               // 'loop' ';'
       && lk != 27314               // 'lt' ';'
       && lk != 27316               // 'mod' ';'
       && lk != 27317               // 'modify' ';'
       && lk != 27318               // 'module' ';'
       && lk != 27320               // 'namespace' ';'
       && lk != 27321               // 'namespace-node' ';'
       && lk != 27322               // 'ne' ';'
       && lk != 27327               // 'node' ';'
       && lk != 27328               // 'nodes' ';'
       && lk != 27330               // 'object' ';'
       && lk != 27334               // 'only' ';'
       && lk != 27335               // 'option' ';'
       && lk != 27336               // 'or' ';'
       && lk != 27337               // 'order' ';'
       && lk != 27338               // 'ordered' ';'
       && lk != 27339               // 'ordering' ';'
       && lk != 27342               // 'parent' ';'
       && lk != 27348               // 'preceding' ';'
       && lk != 27349               // 'preceding-sibling' ';'
       && lk != 27352               // 'processing-instruction' ';'
       && lk != 27354               // 'rename' ';'
       && lk != 27355               // 'replace' ';'
       && lk != 27356               // 'return' ';'
       && lk != 27357               // 'returning' ';'
       && lk != 27358               // 'revalidation' ';'
       && lk != 27360               // 'satisfies' ';'
       && lk != 27361               // 'schema' ';'
       && lk != 27362               // 'schema-attribute' ';'
       && lk != 27363               // 'schema-element' ';'
       && lk != 27364               // 'score' ';'
       && lk != 27365               // 'self' ';'
       && lk != 27370               // 'sliding' ';'
       && lk != 27371               // 'some' ';'
       && lk != 27372               // 'stable' ';'
       && lk != 27373               // 'start' ';'
       && lk != 27376               // 'strict' ';'
       && lk != 27378               // 'structured-item' ';'
       && lk != 27379               // 'switch' ';'
       && lk != 27380               // 'text' ';'
       && lk != 27384               // 'to' ';'
       && lk != 27385               // 'treat' ';'
       && lk != 27386               // 'try' ';'
       && lk != 27387               // 'tumbling' ';'
       && lk != 27388               // 'type' ';'
       && lk != 27389               // 'typeswitch' ';'
       && lk != 27390               // 'union' ';'
       && lk != 27392               // 'unordered' ';'
       && lk != 27393               // 'updating' ';'
       && lk != 27396               // 'validate' ';'
       && lk != 27397               // 'value' ';'
       && lk != 27398               // 'variable' ';'
       && lk != 27399               // 'version' ';'
       && lk != 27402               // 'where' ';'
       && lk != 27403               // 'while' ';'
       && lk != 27406               // 'with' ';'
       && lk != 27410               // 'xquery' ';'
       && lk != 90198               // 'break' 'loop'
       && lk != 90214               // 'continue' 'loop'
       && lk != 113284              // 'exit' 'returning'
       && lk != 144389              // Wildcard '}'
       && lk != 144390              // EQName^Token '}'
       && lk != 144392              // IntegerLiteral '}'
       && lk != 144393              // DecimalLiteral '}'
       && lk != 144394              // DoubleLiteral '}'
       && lk != 144395              // StringLiteral '}'
       && lk != 144428              // '.' '}'
       && lk != 144429              // '..' '}'
       && lk != 144430              // '/' '}'
       && lk != 144454              // 'after' '}'
       && lk != 144456              // 'allowing' '}'
       && lk != 144457              // 'ancestor' '}'
       && lk != 144458              // 'ancestor-or-self' '}'
       && lk != 144459              // 'and' '}'
       && lk != 144461              // 'append' '}'
       && lk != 144462              // 'array' '}'
       && lk != 144463              // 'as' '}'
       && lk != 144464              // 'ascending' '}'
       && lk != 144465              // 'at' '}'
       && lk != 144466              // 'attribute' '}'
       && lk != 144467              // 'base-uri' '}'
       && lk != 144468              // 'before' '}'
       && lk != 144469              // 'boundary-space' '}'
       && lk != 144470              // 'break' '}'
       && lk != 144472              // 'case' '}'
       && lk != 144473              // 'cast' '}'
       && lk != 144474              // 'castable' '}'
       && lk != 144475              // 'catch' '}'
       && lk != 144477              // 'child' '}'
       && lk != 144478              // 'collation' '}'
       && lk != 144480              // 'comment' '}'
       && lk != 144481              // 'constraint' '}'
       && lk != 144482              // 'construction' '}'
       && lk != 144485              // 'context' '}'
       && lk != 144486              // 'continue' '}'
       && lk != 144487              // 'copy' '}'
       && lk != 144488              // 'copy-namespaces' '}'
       && lk != 144489              // 'count' '}'
       && lk != 144490              // 'decimal-format' '}'
       && lk != 144492              // 'declare' '}'
       && lk != 144493              // 'default' '}'
       && lk != 144494              // 'delete' '}'
       && lk != 144495              // 'descendant' '}'
       && lk != 144496              // 'descendant-or-self' '}'
       && lk != 144497              // 'descending' '}'
       && lk != 144502              // 'div' '}'
       && lk != 144503              // 'document' '}'
       && lk != 144504              // 'document-node' '}'
       && lk != 144505              // 'element' '}'
       && lk != 144506              // 'else' '}'
       && lk != 144507              // 'empty' '}'
       && lk != 144508              // 'empty-sequence' '}'
       && lk != 144509              // 'encoding' '}'
       && lk != 144510              // 'end' '}'
       && lk != 144512              // 'eq' '}'
       && lk != 144513              // 'every' '}'
       && lk != 144515              // 'except' '}'
       && lk != 144516              // 'exit' '}'
       && lk != 144517              // 'external' '}'
       && lk != 144518              // 'first' '}'
       && lk != 144519              // 'following' '}'
       && lk != 144520              // 'following-sibling' '}'
       && lk != 144521              // 'for' '}'
       && lk != 144525              // 'ft-option' '}'
       && lk != 144529              // 'function' '}'
       && lk != 144530              // 'ge' '}'
       && lk != 144532              // 'group' '}'
       && lk != 144534              // 'gt' '}'
       && lk != 144535              // 'idiv' '}'
       && lk != 144536              // 'if' '}'
       && lk != 144537              // 'import' '}'
       && lk != 144538              // 'in' '}'
       && lk != 144539              // 'index' '}'
       && lk != 144543              // 'insert' '}'
       && lk != 144544              // 'instance' '}'
       && lk != 144545              // 'integrity' '}'
       && lk != 144546              // 'intersect' '}'
       && lk != 144547              // 'into' '}'
       && lk != 144548              // 'is' '}'
       && lk != 144549              // 'item' '}'
       && lk != 144550              // 'json' '}'
       && lk != 144551              // 'json-item' '}'
       && lk != 144554              // 'last' '}'
       && lk != 144555              // 'lax' '}'
       && lk != 144556              // 'le' '}'
       && lk != 144558              // 'let' '}'
       && lk != 144560              // 'loop' '}'
       && lk != 144562              // 'lt' '}'
       && lk != 144564              // 'mod' '}'
       && lk != 144565              // 'modify' '}'
       && lk != 144566              // 'module' '}'
       && lk != 144568              // 'namespace' '}'
       && lk != 144569              // 'namespace-node' '}'
       && lk != 144570              // 'ne' '}'
       && lk != 144575              // 'node' '}'
       && lk != 144576              // 'nodes' '}'
       && lk != 144578              // 'object' '}'
       && lk != 144582              // 'only' '}'
       && lk != 144583              // 'option' '}'
       && lk != 144584              // 'or' '}'
       && lk != 144585              // 'order' '}'
       && lk != 144586              // 'ordered' '}'
       && lk != 144587              // 'ordering' '}'
       && lk != 144590              // 'parent' '}'
       && lk != 144596              // 'preceding' '}'
       && lk != 144597              // 'preceding-sibling' '}'
       && lk != 144600              // 'processing-instruction' '}'
       && lk != 144602              // 'rename' '}'
       && lk != 144603              // 'replace' '}'
       && lk != 144604              // 'return' '}'
       && lk != 144605              // 'returning' '}'
       && lk != 144606              // 'revalidation' '}'
       && lk != 144608              // 'satisfies' '}'
       && lk != 144609              // 'schema' '}'
       && lk != 144610              // 'schema-attribute' '}'
       && lk != 144611              // 'schema-element' '}'
       && lk != 144612              // 'score' '}'
       && lk != 144613              // 'self' '}'
       && lk != 144618              // 'sliding' '}'
       && lk != 144619              // 'some' '}'
       && lk != 144620              // 'stable' '}'
       && lk != 144621              // 'start' '}'
       && lk != 144624              // 'strict' '}'
       && lk != 144626              // 'structured-item' '}'
       && lk != 144627              // 'switch' '}'
       && lk != 144628              // 'text' '}'
       && lk != 144632              // 'to' '}'
       && lk != 144633              // 'treat' '}'
       && lk != 144634              // 'try' '}'
       && lk != 144635              // 'tumbling' '}'
       && lk != 144636              // 'type' '}'
       && lk != 144637              // 'typeswitch' '}'
       && lk != 144638              // 'union' '}'
       && lk != 144640              // 'unordered' '}'
       && lk != 144641              // 'updating' '}'
       && lk != 144644              // 'validate' '}'
       && lk != 144645              // 'value' '}'
       && lk != 144646              // 'variable' '}'
       && lk != 144647              // 'version' '}'
       && lk != 144650              // 'where' '}'
       && lk != 144651              // 'while' '}'
       && lk != 144654              // 'with' '}'
       && lk != 144658)             // 'xquery' '}'
      {
        lk = memoized(6, e0);
        if (lk == 0)
        {
          var b0A = b0; var e0A = e0; var l1A = l1;
          var b1A = b1; var e1A = e1; var l2A = l2;
          var b2A = b2; var e2A = e2;
          try
          {
            try_Statement();
            memoize(6, e0A, -1);
            continue;
          }
          catch (p1A)
          {
            b0 = b0A; e0 = e0A; l1 = l1A; if (l1 == 0) {end = e0A;} else {
            b1 = b1A; e1 = e1A; l2 = l2A; if (l2 == 0) {end = e1A;} else {
            b2 = b2A; e2 = e2A; end = e2A; }}
            memoize(6, e0A, -2);
            break;
          }
        }
      }
      if (lk != -1
       && lk != 53                  // ';'
       && lk != 16134               // 'variable' '$'
       && lk != 27141               // Wildcard ';'
       && lk != 27142               // EQName^Token ';'
       && lk != 27144               // IntegerLiteral ';'
       && lk != 27145               // DecimalLiteral ';'
       && lk != 27146               // DoubleLiteral ';'
       && lk != 27147               // StringLiteral ';'
       && lk != 27180               // '.' ';'
       && lk != 27181               // '..' ';'
       && lk != 27182               // '/' ';'
       && lk != 27206               // 'after' ';'
       && lk != 27208               // 'allowing' ';'
       && lk != 27209               // 'ancestor' ';'
       && lk != 27210               // 'ancestor-or-self' ';'
       && lk != 27211               // 'and' ';'
       && lk != 27213               // 'append' ';'
       && lk != 27214               // 'array' ';'
       && lk != 27215               // 'as' ';'
       && lk != 27216               // 'ascending' ';'
       && lk != 27217               // 'at' ';'
       && lk != 27218               // 'attribute' ';'
       && lk != 27219               // 'base-uri' ';'
       && lk != 27220               // 'before' ';'
       && lk != 27221               // 'boundary-space' ';'
       && lk != 27222               // 'break' ';'
       && lk != 27224               // 'case' ';'
       && lk != 27225               // 'cast' ';'
       && lk != 27226               // 'castable' ';'
       && lk != 27227               // 'catch' ';'
       && lk != 27229               // 'child' ';'
       && lk != 27230               // 'collation' ';'
       && lk != 27232               // 'comment' ';'
       && lk != 27233               // 'constraint' ';'
       && lk != 27234               // 'construction' ';'
       && lk != 27237               // 'context' ';'
       && lk != 27238               // 'continue' ';'
       && lk != 27239               // 'copy' ';'
       && lk != 27240               // 'copy-namespaces' ';'
       && lk != 27241               // 'count' ';'
       && lk != 27242               // 'decimal-format' ';'
       && lk != 27244               // 'declare' ';'
       && lk != 27245               // 'default' ';'
       && lk != 27246               // 'delete' ';'
       && lk != 27247               // 'descendant' ';'
       && lk != 27248               // 'descendant-or-self' ';'
       && lk != 27249               // 'descending' ';'
       && lk != 27254               // 'div' ';'
       && lk != 27255               // 'document' ';'
       && lk != 27256               // 'document-node' ';'
       && lk != 27257               // 'element' ';'
       && lk != 27258               // 'else' ';'
       && lk != 27259               // 'empty' ';'
       && lk != 27260               // 'empty-sequence' ';'
       && lk != 27261               // 'encoding' ';'
       && lk != 27262               // 'end' ';'
       && lk != 27264               // 'eq' ';'
       && lk != 27265               // 'every' ';'
       && lk != 27267               // 'except' ';'
       && lk != 27268               // 'exit' ';'
       && lk != 27269               // 'external' ';'
       && lk != 27270               // 'first' ';'
       && lk != 27271               // 'following' ';'
       && lk != 27272               // 'following-sibling' ';'
       && lk != 27273               // 'for' ';'
       && lk != 27277               // 'ft-option' ';'
       && lk != 27281               // 'function' ';'
       && lk != 27282               // 'ge' ';'
       && lk != 27284               // 'group' ';'
       && lk != 27286               // 'gt' ';'
       && lk != 27287               // 'idiv' ';'
       && lk != 27288               // 'if' ';'
       && lk != 27289               // 'import' ';'
       && lk != 27290               // 'in' ';'
       && lk != 27291               // 'index' ';'
       && lk != 27295               // 'insert' ';'
       && lk != 27296               // 'instance' ';'
       && lk != 27297               // 'integrity' ';'
       && lk != 27298               // 'intersect' ';'
       && lk != 27299               // 'into' ';'
       && lk != 27300               // 'is' ';'
       && lk != 27301               // 'item' ';'
       && lk != 27302               // 'json' ';'
       && lk != 27303               // 'json-item' ';'
       && lk != 27306               // 'last' ';'
       && lk != 27307               // 'lax' ';'
       && lk != 27308               // 'le' ';'
       && lk != 27310               // 'let' ';'
       && lk != 27312               // 'loop' ';'
       && lk != 27314               // 'lt' ';'
       && lk != 27316               // 'mod' ';'
       && lk != 27317               // 'modify' ';'
       && lk != 27318               // 'module' ';'
       && lk != 27320               // 'namespace' ';'
       && lk != 27321               // 'namespace-node' ';'
       && lk != 27322               // 'ne' ';'
       && lk != 27327               // 'node' ';'
       && lk != 27328               // 'nodes' ';'
       && lk != 27330               // 'object' ';'
       && lk != 27334               // 'only' ';'
       && lk != 27335               // 'option' ';'
       && lk != 27336               // 'or' ';'
       && lk != 27337               // 'order' ';'
       && lk != 27338               // 'ordered' ';'
       && lk != 27339               // 'ordering' ';'
       && lk != 27342               // 'parent' ';'
       && lk != 27348               // 'preceding' ';'
       && lk != 27349               // 'preceding-sibling' ';'
       && lk != 27352               // 'processing-instruction' ';'
       && lk != 27354               // 'rename' ';'
       && lk != 27355               // 'replace' ';'
       && lk != 27356               // 'return' ';'
       && lk != 27357               // 'returning' ';'
       && lk != 27358               // 'revalidation' ';'
       && lk != 27360               // 'satisfies' ';'
       && lk != 27361               // 'schema' ';'
       && lk != 27362               // 'schema-attribute' ';'
       && lk != 27363               // 'schema-element' ';'
       && lk != 27364               // 'score' ';'
       && lk != 27365               // 'self' ';'
       && lk != 27370               // 'sliding' ';'
       && lk != 27371               // 'some' ';'
       && lk != 27372               // 'stable' ';'
       && lk != 27373               // 'start' ';'
       && lk != 27376               // 'strict' ';'
       && lk != 27378               // 'structured-item' ';'
       && lk != 27379               // 'switch' ';'
       && lk != 27380               // 'text' ';'
       && lk != 27384               // 'to' ';'
       && lk != 27385               // 'treat' ';'
       && lk != 27386               // 'try' ';'
       && lk != 27387               // 'tumbling' ';'
       && lk != 27388               // 'type' ';'
       && lk != 27389               // 'typeswitch' ';'
       && lk != 27390               // 'union' ';'
       && lk != 27392               // 'unordered' ';'
       && lk != 27393               // 'updating' ';'
       && lk != 27396               // 'validate' ';'
       && lk != 27397               // 'value' ';'
       && lk != 27398               // 'variable' ';'
       && lk != 27399               // 'version' ';'
       && lk != 27402               // 'where' ';'
       && lk != 27403               // 'while' ';'
       && lk != 27406               // 'with' ';'
       && lk != 27410               // 'xquery' ';'
       && lk != 90198               // 'break' 'loop'
       && lk != 90214               // 'continue' 'loop'
       && lk != 113284)             // 'exit' 'returning'
      {
        break;
      }
      try_Statement();
    }
  }