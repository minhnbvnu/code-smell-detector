function _checkParams() {
    var params = _current["(params)"];

    if (!params) {
      return;
    }

    var param = params.pop();
    var unused_opt;

    while (param) {
      var label = _current["(labels)"][param];

      unused_opt = _getUnusedOption(state.funct["(unusedOption)"]);
      if (param === "undefined")
        return;

      if (label["(unused)"]) {
        _warnUnused(param, label["(token)"], "param", state.funct["(unusedOption)"]);
      } else if (unused_opt === "last-param") {
        return;
      }

      param = params.pop();
    }
  }