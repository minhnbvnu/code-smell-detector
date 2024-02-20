function whenNot(conditionFn, ctx, callback, message) {
  if (!conditionFn(ctx)) {
    if (callback) {
      callback(ctx, `${message} ${ctx.getText()}.`)
    }
  }
}