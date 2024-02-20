function classtail(c) {
    var wasInClassBody = state.inClassBody;
    if (state.tokens.next.value === "extends") {
      advance("extends");
      c.heritage = expression(10);
    }

    state.inClassBody = true;
    advance("{");
    c.body = classbody(c);
    advance("}");
    state.inClassBody = wasInClassBody;
  }