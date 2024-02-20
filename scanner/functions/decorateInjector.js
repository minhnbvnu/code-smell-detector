function decorateInjector(tData) {
            var oldinvoke = $injector.invoke;
            var oldinstantiate = $injector.instantiate;
            $injector.invoke = function (fn, self, locals) {
              return oldinvoke(fn, self, angular.extend({$transition$: tData}, locals));
            };
            $injector.instantiate = function (fn, locals) {
              return oldinstantiate(fn, angular.extend({$transition$: tData}, locals));
            };

            return function restoreItems() {
              $injector.invoke = oldinvoke;
              $injector.instantiate = oldinstantiate;
            };
          }