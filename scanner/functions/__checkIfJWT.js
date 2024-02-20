function __checkIfJWT(ctx) {
  return !ctx.ctxCaller && (!!ctx.get('authorization') || ctx.query.hasOwnProperty('eb-jwt'));
}