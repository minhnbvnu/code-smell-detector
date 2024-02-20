function allExportsProxies(id) {
      var e = scope.cache[id].exports;
      return isProxy(e) || (isPlainObj(e) && all(vals(e), isProxy));

      function isProxy(x) {
        return x && !!x.__$$LiveReactLoadable;
      }
    }