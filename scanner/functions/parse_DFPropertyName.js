function parse_DFPropertyName()
  {
    eventHandler.startNonterminal("DFPropertyName", e0);
    switch (l1)
    {
    case 107:                       // 'decimal-separator'
      shift(107);                   // 'decimal-separator'
      break;
    case 149:                       // 'grouping-separator'
      shift(149);                   // 'grouping-separator'
      break;
    case 156:                       // 'infinity'
      shift(156);                   // 'infinity'
      break;
    case 179:                       // 'minus-sign'
      shift(179);                   // 'minus-sign'
      break;
    case 67:                        // 'NaN'
      shift(67);                    // 'NaN'
      break;
    case 209:                       // 'percent'
      shift(209);                   // 'percent'
      break;
    case 208:                       // 'per-mille'
      shift(208);                   // 'per-mille'
      break;
    case 275:                       // 'zero-digit'
      shift(275);                   // 'zero-digit'
      break;
    case 116:                       // 'digit'
      shift(116);                   // 'digit'
      break;
    default:
      shift(207);                   // 'pattern-separator'
    }
    eventHandler.endNonterminal("DFPropertyName", e0);
  }