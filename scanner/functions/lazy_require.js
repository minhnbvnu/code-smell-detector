function lazy_require(loads) {
  var lazy = {};
  _.each(loads, (func, getter) => {
    if (!_.isFunction(func)) {
      var opts = func;

      // Only name module support
      if (_.isString(opts)) {
        opts = [opts];
      } else if (_.isEmpty(opts[1])) {
        opts[1] = getter;
      }

      // Require function
      func = () => {
        var mod = require(opts[0]);
        return _.isEmpty(opts[1]) ? mod : mod[opts[1]];
      };
    }
    lazy.__defineGetter__(getter, func);
  });

  return lazy;
}