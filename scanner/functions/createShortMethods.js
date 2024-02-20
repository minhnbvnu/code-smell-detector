function createShortMethods(names) {
      forEach(arguments, function(name) {
        $http[name] = function(url, config) {
          return $http(extend({}, config || {}, {
            method: name,
            url: url
          }));
        };
      });
    }