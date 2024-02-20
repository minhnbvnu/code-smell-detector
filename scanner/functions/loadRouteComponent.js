function loadRouteComponent(url, cb) {
    loadRoute(url, route => {
      if (!route) throw new Error(`not found route: ${url}`);
      if (!route.route.async) return cb(route.route.component);
      route.route.async(
        url,
        null,
        data => {
          return cb(data.component);
        },
        () => {
          // do nothing
          //   maybe need login
        }
      );
    });
  }