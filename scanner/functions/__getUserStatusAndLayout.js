function __getUserStatusAndLayout({ Vue }) {
  // userStatus
  const user = Vue.prototype.$meta.store.state.auth.user;
  const userOp = user && user.op;
  const userStatus = !userOp || userOp.anonymous ? 'anonymous' : 'authenticated';
  // layout
  const layout = Vue.prototype.$meta.vueApp.layout;
  // ok
  return { userStatus, layout };
}