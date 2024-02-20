function inScope(state, varname) {
    for (var v = state.localVars; v; v = v.next)
      { if (v.name == varname) { return true; } }
    for (var cx = state.context; cx; cx = cx.prev) {
      for (var v = cx.vars; v; v = v.next)
        { if (v.name == varname) { return true; } }
    }
  }