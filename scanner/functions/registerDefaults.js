function registerDefaults(item, scope, parentScope) {
  // Inherit the parent's defaults and keep existing defaults
  const itemDefaults = merge(Object.create(null), [
    parentScope ? defaults.get(parentScope) : {},
    defaults.get(scope),
    item.defaults
  ]);

  defaults.set(scope, itemDefaults);

  if (item.defaultRoutes) {
    routeDefaults(scope, item.defaultRoutes);
  }

  if (item.descriptors) {
    defaults.describe(scope, item.descriptors);
  }
}