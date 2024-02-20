function convertRoutesConfigToRoutes(routeConfig) {
  const routes = [];
  for (const route of Object.entries(routeConfig)) {
    let deformedRoute = _.mapKeys(route[1], (value, key) => {
      return _.lowerFirst(key);
    });
    deformedRoute.path = route[0];
    routes.push(deformedRoute);
  }
  return routes;
}