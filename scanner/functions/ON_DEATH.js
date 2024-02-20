function ON_DEATH (callback) {
  var handlers = [];
  Object.keys(defaultConfig).forEach(function(key) {
    var val = defaultConfig[key]
    var handler = null;
    if (val) {
      if (DEBUG) {
        handler = function() {
          var args = Array.prototype.slice.call(arguments, 0)
          args.unshift(key)
          console.log('Trapped ' + key)
          callback.apply(null, args)
        };
        process.on(key, handler)
      } else {
        handler = function() {
          var args = Array.prototype.slice.call(arguments, 0)
          args.unshift(key)
          callback.apply(null, args)
        }
        process.on(key, handler)
      }
      handlers.push([key, handler])
    }
  })
  return function OFF_DEATH() {
    handlers.forEach(function (args) {
      var key = args[0];
      var handler = args[1];
      process.removeListener(key, handler);
    })
  }
}