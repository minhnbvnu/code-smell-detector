function pointerHook(_stream, state) {
    if (state.prevToken == "type") return "type";
    return false;
  }