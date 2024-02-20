function _createAuthenticate() {
  return async function (ctx, next) {
    const urlPattern = ctx.params[0];
    const [module, providerName, providerScene] = urlPattern.split('/');
    ctx.params.module = module;
    ctx.params.providerName = providerName;
    ctx.params.providerScene = providerScene;
    // authenticate
    await ctx.bean.local.module('a-auth').passport.authenticate({
      module,
      providerName,
      providerScene,
      next,
    });
  };
}