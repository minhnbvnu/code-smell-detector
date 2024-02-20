function routerInstance () {

  if (typeof window.routerInstance_ !== 'undefined') {
    return Promise.resolve(window.routerInstance_);
  }

  window.routerInstance_ = new Router();

  return Promise.resolve(window.routerInstance_);
}