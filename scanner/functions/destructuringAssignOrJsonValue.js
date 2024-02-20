function destructuringAssignOrJsonValue() {

    var block = lookupBlockType();
    if (block.notJson) {
      if (!state.inES6() && block.isDestAssign) {
        warning("W104", state.tokens.curr, "destructuring assignment", "6");
      }
      statements();
    } else {
      state.option.laxbreak = true;
      state.jsonMode = true;
      jsonValue();
    }
  }