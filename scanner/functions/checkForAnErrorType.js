function checkForAnErrorType(type) {
          if (typeof type !== 'function') {
            return false;
          }

          var Surrogate = function() {};
          Surrogate.prototype = type.prototype;
          return (new Surrogate()) instanceof Error;
        }