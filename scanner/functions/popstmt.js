function popstmt() {
    return function() { return state.shift(), state.shift() }
  }