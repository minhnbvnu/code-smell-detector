function setFlag(state, flag) {
    var ctx = state.ctx
    state.ctx = {type: ctx.type,
                 indent: ctx.indent,
                 flags: ctx.flags | flag,
                 column: ctx.column,
                 prev: ctx.prev}
  }