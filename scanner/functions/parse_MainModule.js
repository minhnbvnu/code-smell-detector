function parse_MainModule()
  {
    eventHandler.startNonterminal("MainModule", e0);
    parse_Prolog();
    whitespace();
    parse_Program();
    eventHandler.endNonterminal("MainModule", e0);
  }