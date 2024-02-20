function tokens(ctx) {
  let curCtx = ctx
  while (curCtx && curCtx.parentCtx && !curCtx.parser) {
    curCtx = curCtx.parentCtx
  }

  return curCtx.parser._input.tokens
}