function loadRoute(url, cb) {
    // match
    let route = router.findMatchingRoute(url);
    if (route) return cb(route);
    // info
    const moduleInfo = mparse.parseInfo(url);
    if (!moduleInfo) {
      // should not throw error
      console.log('invalid page path: ', url);
      return cb(null);
    }
    // use module
    ctx.$meta.module.use(moduleInfo, () => {
      route = router.routes && router.findMatchingRoute(url);
      if (!route) {
        // should not throw error
        console.log('page path not found: ', url);
      }
      return cb(route);
    });
  }