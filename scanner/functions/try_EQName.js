function try_EQName()
  {
    lookahead1(249);                // EQName^Token | 'after' | 'allowing' | 'ancestor' | 'ancestor-or-self' | 'and' |
    switch (l1)
    {
    case 82:                        // 'attribute'
      shiftT(82);                   // 'attribute'
      break;
    case 96:                        // 'comment'
      shiftT(96);                   // 'comment'
      break;
    case 120:                       // 'document-node'
      shiftT(120);                  // 'document-node'
      break;
    case 121:                       // 'element'
      shiftT(121);                  // 'element'
      break;
    case 124:                       // 'empty-sequence'
      shiftT(124);                  // 'empty-sequence'
      break;
    case 145:                       // 'function'
      shiftT(145);                  // 'function'
      break;
    case 152:                       // 'if'
      shiftT(152);                  // 'if'
      break;
    case 165:                       // 'item'
      shiftT(165);                  // 'item'
      break;
    case 185:                       // 'namespace-node'
      shiftT(185);                  // 'namespace-node'
      break;
    case 191:                       // 'node'
      shiftT(191);                  // 'node'
      break;
    case 216:                       // 'processing-instruction'
      shiftT(216);                  // 'processing-instruction'
      break;
    case 226:                       // 'schema-attribute'
      shiftT(226);                  // 'schema-attribute'
      break;
    case 227:                       // 'schema-element'
      shiftT(227);                  // 'schema-element'
      break;
    case 243:                       // 'switch'
      shiftT(243);                  // 'switch'
      break;
    case 244:                       // 'text'
      shiftT(244);                  // 'text'
      break;
    case 253:                       // 'typeswitch'
      shiftT(253);                  // 'typeswitch'
      break;
    case 78:                        // 'array'
      shiftT(78);                   // 'array'
      break;
    case 167:                       // 'json-item'
      shiftT(167);                  // 'json-item'
      break;
    case 242:                       // 'structured-item'
      shiftT(242);                  // 'structured-item'
      break;
    default:
      try_FunctionName();
    }
  }