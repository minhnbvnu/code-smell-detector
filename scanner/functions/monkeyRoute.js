function monkeyRoute(module, routePath, routeModule, routeComponent) {
    const route = module.options.routes.find(item => item.path === routePath);
    if (route) {
      route.module = routeModule;
      route.component = routeComponent;
    }
  }