function advance_expr(until) {
    return function() { return state.unshift(expr(until)), Advance }
  }