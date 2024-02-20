function parse_VarDefaultValue()
  {
    eventHandler.startNonterminal("VarDefaultValue", e0);
    parse_ExprSingle();
    eventHandler.endNonterminal("VarDefaultValue", e0);
  }