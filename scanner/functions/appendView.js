function appendView(route, view, options) {
  if (options.into) {
    var parentView = route.router._lookupActiveView(options.into);
    var teardownOutletView = generateOutletTeardown(parentView, options.outlet);
    if (!route.teardownOutletViews) { route.teardownOutletViews = []; }
    a_replace(route.teardownOutletViews, 0, 0, [teardownOutletView]);
    parentView.connectOutlet(options.outlet, view);
  } else {
    var rootElement = get(route, 'router.namespace.rootElement');
    // tear down view if one is already rendered
    if (route.teardownTopLevelView) {
      route.teardownTopLevelView();
    }
    route.router._connectActiveView(options.name, view);
    route.teardownTopLevelView = generateTopLevelTeardown(view);
    view.appendTo(rootElement);
  }
}