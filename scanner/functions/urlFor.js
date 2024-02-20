function urlFor(req, res) {
  
  return function(options) {
    options = options || {};
    var app = req._locomotive.app;
    
    // If the argument is a record from a datastore, find and call the
    // corresponding named routing helper.
    if (options.constructor.name !== 'Object') {
      var opts = arguments[1] || {};
      var recordof = app._recordOf(options);
      if (!recordof) { throw new Error("Unable to determine record type of '" + options.constructor.name + "'"); }
      var helperName = router.util.functionize(recordof, 'URL');
      if (opts.onlyPath) {
        helperName = router.util.functionize(recordof, 'Path');
      }
      var helperFn = this[helperName];
      if (!helperFn || (typeof helperFn !== 'function')) { throw new Error("No routing helper named '" + helperName + "'"); }
      return helperFn.call(this, options);
    }
    
    options.controller = router.util.controllerize(options.controller) || req._locomotive.controller;
    options.action = router.util.functionize(options.action) || req._locomotive.action;
    
    if (req.headers && req.headers.host) {
      options.protocol = options.protocol || req.protocol || 'http';
      options.host = options.host || req.headers.host;
    }
    
    if (!options.pathname) {
      var route = app._routeTo(options.controller, options.action);
      if (!route) { throw new Error("No route to '" + options.controller + "#" + options.action + "'"); }
      options.pathname = route.path(options);
    }
    
    if (options.onlyPath) {
      return url.format({ pathname: options.pathname });
    }
    return url.format(options);
  };
}