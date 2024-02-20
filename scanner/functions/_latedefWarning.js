function _latedefWarning(type, labelName, token) {
    if (state.option.latedef) {
      if ((state.option.latedef === true && type === "function") ||
        type !== "function") {
        warning("W003", token, labelName);
      }
    }
  }