function parse_EQName()
  {
    eventHandler.startNonterminal("EQName", e0);
    lookahead1(249);                // EQName^Token | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' | 'and' |
    switch (l1)
    {
    case 82:                        // 'attribute'
      shift(82);                    // 'attribute'
      break;
    case 96:                        // 'comment'
      shift(96);                    // 'comment'
      break;
    case 120:                       // 'document-node'
      shift(120);                   // 'document-node'
      break;
    case 121:                       // 'element'
      shift(121);                   // 'element'
      break;
    case 124:                       // 'empty-sequence'
      shift(124);                   // 'empty-sequence'
      break;
    case 145:                       // 'function'
      shift(145);                   // 'function'
      break;
    case 152:                       // 'if'
      shift(152);                   // 'if'
      break;
    case 165:                       // 'item'
      shift(165);                   // 'item'
      break;
    case 185:                       // 'namespace-node'
      shift(185);                   // 'namespace-node'
      break;
    case 191:                       // 'node'
      shift(191);                   // 'node'
      break;
    case 216:                       // 'processing-instruction'
      shift(216);                   // 'processing-instruction'
      break;
    case 226:                       // 'schema-attribute'
      shift(226);                   // 'schema-attribute'
      break;
    case 227:                       // 'schema-element'
      shift(227);                   // 'schema-element'
      break;
    case 243:                       // 'switch'
      shift(243);                   // 'switch'
      break;
    case 244:                       // 'text'
      shift(244);                   // 'text'
      break;
    case 253:                       // 'typeswitch'
      shift(253);                   // 'typeswitch'
      break;
    case 78:                        // 'array'
      shift(78);                    // 'array'
      break;
    case 167:                       // 'json-item'
      shift(167);                   // 'json-item'
      break;
    case 242:                       // 'structured-item'
      shift(242);                   // 'structured-item'
      break;
    default:
      parse_FunctionName();
    }
    eventHandler.endNonterminal("EQName", e0);
  }