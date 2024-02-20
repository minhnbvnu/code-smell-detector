function logOnStacktrace$1(source, property) {
      if (!property) {
        return;
      }
      var refineStackTrace = function refineStackTrace(stackString) {
        // Split stack trace string by lines and remove first two elements ('Error' and getter call)
        // Remove '    at ' at the start of each string
        var stackSteps = stackString.split('\n').slice(2).map(function (line) {
          return line.replace(/ {4}at /, '');
        });
        // Trim each line extracting funcName : fullPath pair
        var logInfoArray = stackSteps.map(function (line) {
          var funcName;
          var funcFullPath;
          /* eslint-disable-next-line no-useless-escape */
          var reg = /\(([^\)]+)\)/;
          var regFirefox = /(.*?@)(\S+)(:\d+):\d+\)?$/;
          if (line.match(reg)) {
            funcName = line.split(' ').slice(0, -1).join(' ');
            /* eslint-disable-next-line prefer-destructuring */
            funcFullPath = line.match(reg)[1];
          } else if (line.match(regFirefox)) {
            funcName = line.split('@').slice(0, -1).join(' ');
            /* eslint-disable-next-line prefer-destructuring */
            funcFullPath = line.match(regFirefox)[2];
          } else {
            // For when func name is not available
            funcName = 'function name is not available';
            funcFullPath = line;
          }
          return [funcName, funcFullPath];
        });
        // Convert array into object for better display using console.table
        var logInfoObject = {};
        logInfoArray.forEach(function (pair) {
          /* eslint-disable-next-line prefer-destructuring */
          logInfoObject[pair[0]] = pair[1];
        });
        return logInfoObject;
      };
      var setChainPropAccess = function setChainPropAccess(owner, property) {
        var chainInfo = getPropertyInChain(owner, property);
        var base = chainInfo.base;
        var prop = chainInfo.prop,
          chain = chainInfo.chain;
        if (chain) {
          var setter = function setter(a) {
            base = a;
            if (a instanceof Object) {
              setChainPropAccess(a, chain);
            }
          };
          Object.defineProperty(owner, prop, {
            get: function get() {
              return base;
            },
            set: setter
          });
          return;
        }
        var value = base[prop];
        /* eslint-disable no-console */
        setPropertyAccess(base, prop, {
          get() {
            hit(source);
            logMessage(source, "Get ".concat(prop), true);
            console.table(refineStackTrace(new Error().stack));
            return value;
          },
          set(newValue) {
            hit(source);
            logMessage(source, "Set ".concat(prop), true);
            console.table(refineStackTrace(new Error().stack));
            value = newValue;
          }
        });
        /* eslint-enable no-console */
      };

      setChainPropAccess(window, property);
    }