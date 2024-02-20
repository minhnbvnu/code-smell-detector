function resolvePaths(context, params, options) {
    var resolved = handlebarsResolve(context, params, options),
        types = options.types;

    return map.call(resolved, function(object, i) {
      if (types[i] === 'ID') {
        return unwrap(object, params[i]);
      } else {
        return null;
      }
    });

    function unwrap(object, path) {
      if (path === 'controller') { return path; }

      if (Ember.ControllerMixin.detect(object)) {
        return unwrap(get(object, 'model'), path ? path + '.model' : 'model');
      } else {
        return path;
      }
    }
  }