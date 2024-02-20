function parse_JSONTest()
  {
    eventHandler.startNonterminal("JSONTest", e0);
    switch (l1)
    {
    case 167:                       // 'json-item'
      parse_JSONItemTest();
      break;
    case 194:                       // 'object'
      parse_JSONObjectTest();
      break;
    default:
      parse_JSONArrayTest();
    }
    eventHandler.endNonterminal("JSONTest", e0);
  }