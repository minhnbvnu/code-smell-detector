function usedSoFarInCurrentFunction(labelName) {
    for (var i = _scopeStack.length - 1; i >= 0; i--) {
      var current = _scopeStack[i];
      if (current["(usages)"][labelName]) {
        return current["(usages)"][labelName];
      }
      if (current === _currentFunctBody) {
        break;
      }
    }
    return false;
  }