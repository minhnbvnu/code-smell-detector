function statement(type, value) {
    if (type == "var") { return cont(pushlex("vardef", value.length), vardef, expect(";"), poplex); }
    if (type == "keyword a") { return cont(pushlex("form"), parenExpr, statement, poplex); }
    if (type == "keyword b") { return cont(pushlex("form"), statement, poplex); }
    if (type == "{") { return cont(pushlex("}"), block, poplex); }
    if (type == ";") { return cont(); }
    if (type == "if") {
      if (cx.state.lexical.info == "else" && cx.state.cc[cx.state.cc.length - 1] == poplex)
        { cx.state.cc.pop()(); }
      return cont(pushlex("form"), parenExpr, statement, poplex, maybeelse);
    }
    if (type == "function") { return cont(functiondef); }
    if (type == "for") { return cont(pushlex("form"), forspec, statement, poplex); }
    if (type == "variable") { return cont(pushlex("stat"), maybelabel); }
    if (type == "switch") { return cont(pushlex("form"), parenExpr, pushlex("}", "switch"), expect("{"),
                                      block, poplex, poplex); }
    if (type == "case") { return cont(expression, expect(":")); }
    if (type == "default") { return cont(expect(":")); }
    if (type == "catch") { return cont(pushlex("form"), pushcontext, expect("("), funarg, expect(")"),
                                     statement, poplex, popcontext); }
    if (type == "class") { return cont(pushlex("form"), className, poplex); }
    if (type == "export") { return cont(pushlex("stat"), afterExport, poplex); }
    if (type == "import") { return cont(pushlex("stat"), afterImport, poplex); }
    if (type == "module") { return cont(pushlex("form"), pattern, pushlex("}"), expect("{"), block, poplex, poplex) }
    if (type == "type") { return cont(typeexpr, expect("operator"), typeexpr, expect(";")); }
    if (type == "async") { return cont(statement) }
    return pass(pushlex("stat"), expression, expect(";"), poplex);
  }