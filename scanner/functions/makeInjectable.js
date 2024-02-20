function makeInjectable(fn) {
        if (isFunction(fn) || isArray(fn)) {
          return function(tElement, tAttrs) {
            return $injector.invoke(fn, this, {$element: tElement, $attrs: tAttrs});
          };
        } else {
          return fn;
        }
      }