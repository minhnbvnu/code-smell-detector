function _checkOuterShadow(labelName, token) {
    if (state.option.shadow !== "outer") {
      return;
    }

    var isGlobal = _currentFunctBody["(type)"] === "global",
      isNewFunction = _current["(type)"] === "functionparams";

    var outsideCurrentFunction = !isGlobal;
    for (var i = 0; i < _scopeStack.length; i++) {
      var stackItem = _scopeStack[i];

      if (!isNewFunction && _scopeStack[i + 1] === _currentFunctBody) {
        outsideCurrentFunction = false;
      }
      if (outsideCurrentFunction && stackItem["(labels)"][labelName]) {
        warning("W123", token, labelName);
      }
      if (stackItem["(breakLabels)"][labelName]) {
        warning("W123", token, labelName);
      }
    }
  }