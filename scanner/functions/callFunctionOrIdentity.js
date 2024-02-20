function callFunctionOrIdentity(fn) {
        return function(data) {
          return scope[fn] ? scope[fn](data) : data;
        };
      }