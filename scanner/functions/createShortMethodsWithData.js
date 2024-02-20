function createShortMethodsWithData(name) {
      forEach(arguments, function(name) {
        $http[name] = function(url, data, config) {
          return $http(extend({}, config || {}, {
            method: name,
            url: url,
            data: data
          }));
        };
      });
    }