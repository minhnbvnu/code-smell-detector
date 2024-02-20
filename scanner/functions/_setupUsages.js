function _setupUsages(labelName) {
    if (!_current["(usages)"][labelName]) {
      _current["(usages)"][labelName] = {
        "(modified)": [],
        "(reassigned)": [],
        "(tokens)": []
      };
    }
  }