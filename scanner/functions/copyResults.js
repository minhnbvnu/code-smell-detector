function copyResults(result, config) {
      var r = {};
      Object.keys(result).forEach(function (key) {
        r[key] = result[key];
      });
      r.line -= 1;
      r.config = config;
      return r;
    }