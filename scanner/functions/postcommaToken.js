function postcommaToken(state) {
    var objs = state.tokenStack.slice(0,-1);
    var i = getTokenIndex(objs,"type",["open_paren"]);

    return truthy(objs[i]) ? objs[i] : false;
  }