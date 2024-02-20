function cloneVimState(state) {
    var n = new state.constructor();
    Object.keys(state).forEach(function(key) {
      var o = state[key];
      if (Array.isArray(o))
        o = o.slice();
      else if (o && typeof o == "object" && o.constructor != Object)
        o = cloneVimState(o);
      n[key] = o;
    });
    if (state.sel) {
      n.sel = {
        head: state.sel.head && copyCursor(state.sel.head),
        anchor: state.sel.anchor && copyCursor(state.sel.anchor)
      };
    }
    return n;
  }