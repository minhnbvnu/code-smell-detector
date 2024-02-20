function in_array(state) {
    var ch = cur_scope(state);
    if(ch=="[" || ch=="{") {
      return true;
    }
    else {
      return false;
    }
  }