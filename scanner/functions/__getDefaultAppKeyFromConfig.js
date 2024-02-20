function __getDefaultAppKeyFromConfig({ Vue }) {
  const configModule = Vue.prototype.$meta.config.modules['a-app'];
  let appKey = configModule.appInit[window.location.host];
  if (!appKey) {
    appKey = configModule.appInit.default;
  }
  return appKey;
}