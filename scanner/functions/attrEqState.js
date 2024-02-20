function attrEqState(type, stream, state) {
    if (type == "equals") { return attrValueState; }
    if (!config.allowMissing) { setStyle = "error"; }
    return attrState(type, stream, state);
  }