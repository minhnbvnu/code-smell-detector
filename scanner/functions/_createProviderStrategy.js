async function _createProviderStrategy(ctx, authProvider, beanProvider) {
  // config
  let config = {};
  config.passReqToCallback = true;
  config.failWithError = false;
  config.successRedirect = config.successReturnToOrRedirect = beanProvider.metaScene.mode === 'redirect' ? '/' : false;
  // combine
  config = ctx.bean.util.extend({}, beanProvider.configProviderScene, config);
  // config.beanProvider = beanProvider;
  // adjust
  config = await beanProvider.adjustConfigForAuthenticate(config);
  // strategy
  const Strategy = beanProvider.getStrategy();
  return new Strategy(config, _createStrategyCallback(beanProvider));
}