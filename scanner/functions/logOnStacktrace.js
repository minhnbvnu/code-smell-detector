function logOnStacktrace(source, property) {
        if (!property) {
          return;
        }
        var refineStackTrace = function refineStackTrace(stackString) {
          var stackSteps = stackString.split("\n").slice(2).map(function (line) {
            return line.replace(/ {4}at /, "");
          });
          var logInfoArray = stackSteps.map(function (line) {
            var funcName;
            var funcFullPath;
            var reg = /\(([^\)]+)\)/;
            var regFirefox = /(.*?@)(\S+)(:\d+):\d+\)?$/;
            if (line.match(reg)) {
              funcName = line.split(" ").slice(0, -1).join(" ");
              funcFullPath = line.match(reg)[1];
            } else if (line.match(regFirefox)) {
              funcName = line.split("@").slice(0, -1).join(" ");
              funcFullPath = line.match(regFirefox)[2];
            } else {
              funcName = "function name is not available";
              funcFullPath = line;
            }
            return [funcName, funcFullPath];
          });
          var logInfoObject = {};
          logInfoArray.forEach(function (pair) {
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
        };
        setChainPropAccess(window, property);
      }