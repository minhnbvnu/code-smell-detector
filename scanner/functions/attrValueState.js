function attrValueState(type, stream, state) {
    if (type == "string") { return attrContinuedState; }
    if (type == "word" && config.allowUnquoted) {setStyle = "string"; return attrState;}
    setStyle = "error";
    return attrState(type, stream, state);
  }