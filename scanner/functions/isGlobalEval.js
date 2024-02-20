function isGlobalEval(left, state) {
    var isGlobal = false;
    if (left.type === "this" && state.funct["(context)"] === null) {
      isGlobal = true;
    }
    else if (left.type === "(identifier)") {
      if (state.option.node && left.value === "global") {
        isGlobal = true;
      }

      else if (state.option.browser && (left.value === "window" || left.value === "document")) {
        isGlobal = true;
      }
    }

    return isGlobal;
  }