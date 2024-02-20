function maybeop(type) {
    if (content == ".") return cont(maybeprop);
    if (content == "::<"){return cont(typarams, maybeop);}
    if (type == "op" || content == ":") return cont(expression);
    if (type == "(" || type == "[") return matchBrackets(type, expression);
    return pass();
  }