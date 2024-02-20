function cleanCycles(obj) {
    var cache = [];
    return JSON.parse(
      JSON.stringify(obj, function(key, value) {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) {
            // Instead of going in a circle, we'll print [object Object]
            return '' + value;
          }
          cache.push(value);
        }
        return value;
      })
    );
  }