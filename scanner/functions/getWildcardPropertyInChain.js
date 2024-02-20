function getWildcardPropertyInChain(base, chain) {
        var lookThrough = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var output = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
        var pos = chain.indexOf(".");
        if (pos === -1) {
          if (chain === "*" || chain === "[]") {
            for (var key in base) {
              if (Object.prototype.hasOwnProperty.call(base, key)) {
                output.push({
                  base: base,
                  prop: key
                });
              }
            }
          } else {
            output.push({
              base: base,
              prop: chain
            });
          }
          return output;
        }
        var prop = chain.slice(0, pos);
        var shouldLookThrough = prop === "[]" && Array.isArray(base) || prop === "*" && base instanceof Object;
        if (shouldLookThrough) {
          var nextProp = chain.slice(pos + 1);
          var baseKeys = Object.keys(base);
          baseKeys.forEach(function (key) {
            var item = base[key];
            getWildcardPropertyInChain(item, nextProp, lookThrough, output);
          });
        }
        if (Array.isArray(base)) {
          base.forEach(function (key) {
            var nextBase = key;
            if (nextBase !== undefined) {
              getWildcardPropertyInChain(nextBase, chain, lookThrough, output);
            }
          });
        }
        var nextBase = base[prop];
        chain = chain.slice(pos + 1);
        if (nextBase !== undefined) {
          getWildcardPropertyInChain(nextBase, chain, lookThrough, output);
        }
        return output;
      }