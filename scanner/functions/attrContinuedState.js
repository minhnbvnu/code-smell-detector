function attrContinuedState(type, stream, state) {
    if (type == "string") { return attrContinuedState; }
    return attrState(type, stream, state);
  }