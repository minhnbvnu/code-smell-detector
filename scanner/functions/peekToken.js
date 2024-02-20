function peekToken(state,depth) {
    var len = state.tokenStack.length;
    var dep = (depth ? depth : 1);

    if (len < dep) {
      return false;
    }else{
      return state.tokenStack[len-dep];
    }
  }