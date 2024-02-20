function defaultToken(state) {
    var objs = state.tokenStack;
    var stop = getTokenIndex(objs,"type",["open_paren","separator","keyword"]);
    var oper = getTokenIndex(objs,"type",["operator"]);

    if (truthy(stop) && truthy(oper) && stop < oper) {
      return objs[stop+1];
    } else if (truthy(stop)) {
      return objs[stop];
    } else {
      return false;
    }
  }