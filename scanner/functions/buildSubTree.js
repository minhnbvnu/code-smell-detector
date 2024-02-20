function buildSubTree(routeTree, route) {
  let handlers = route.handlers;
  let owner = this.namespace.owner;
  let subTree = routeTree;
  let item;
  let routeClassName;
  let routeHandler;
  let controllerName;
  let controllerClassName;
  let templateName;
  let controllerFactory;

  for (let i = 0; i < handlers.length; i++) {
    item = handlers[i];
    let handler = item.handler;
    if (handler.match(/(loading|error)$/)) {
      // make sure it has been defined before calling `getHandler` because
      // we don't want to generate sub routes as this has side-effects.
      if (!routeHasBeenDefined(owner, handler)) {
        continue;
      }
    }

    if (subTree[handler] === undefined) {
      routeClassName = this.getClassName(handler, 'route');

      const router = this.router;
      const routerLib = router._routerMicrolib || router.router;
      // 3.9.0 removed intimate APIs from router
      // https://github.com/emberjs/ember.js/pull/17843
      // https://deprecations.emberjs.com/v3.x/#toc_remove-handler-infos
      if (compareVersion(Ember.VERSION, '3.9.0') !== -1) {
        // Ember >= 3.9.0
        routeHandler = routerLib.getRoute(handler);
      } else {
        // Ember < 3.9.0
        routeHandler = routerLib.getHandler(handler);
      }

      // Skip when route is an unresolved promise
      if (typeof routeHandler?.then === 'function') {
        // ensure we rebuild the route tree when this route is resolved
        routeHandler.then(() => (this._cachedRouteTree = null));
        controllerName = '(unresolved)';
        controllerClassName = '(unresolved)';
        templateName = '(unresolved)';
      } else {
        const get =
          routeHandler.get ||
          function (prop) {
            return this[prop];
          };
        controllerName =
          get.call(routeHandler, 'controllerName') || routeHandler.routeName;
        controllerFactory = owner.factoryFor
          ? owner.factoryFor(`controller:${controllerName}`)
          : owner._lookupFactory(`controller:${controllerName}`);
        controllerClassName = this.getClassName(controllerName, 'controller');
        templateName = this.getClassName(handler, 'template');
      }

      subTree[handler] = {
        value: {
          name: handler,
          routeHandler: {
            className: routeClassName,
            name: handler,
          },
          controller: {
            className: controllerClassName,
            name: controllerName,
            exists: !!controllerFactory,
          },
          template: {
            name: templateName,
          },
        },
      };

      if (i === handlers.length - 1) {
        // it is a route, get url
        subTree[handler].value.url = getURL(owner, route.segments);
        subTree[handler].value.type = 'route';
      } else {
        // it is a resource, set children object
        subTree[handler].children = {};
        subTree[handler].value.type = 'resource';
      }
    }
    subTree = subTree[handler].children;
  }
}