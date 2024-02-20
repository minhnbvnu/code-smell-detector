function _setUser(state, user) {
    state.user = Object.assign({}, state.user, user);
    // agent rather then op
    const userAgent = user && user.agent;
    if (userAgent && !userAgent.anonymous && userAgent.locale) {
      // cookie
      Vue.prototype.$meta.util.setLocale(user.agent.locale);
    }
    // moment
    const locale = Vue.prototype.$meta.util.getLocale();
    Vue.prototype.$meta.util.moment.locale(locale);
  }