function updateRoute() {
      var next = parseRoute(),
          last = $route.current;

      if (next && last && next.$$route === last.$$route
          && equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
        last.params = next.params;
        copy(last.params, $routeParams);
        $rootScope.$broadcast('$routeUpdate', last);
      } else if (next || last) {
        forceReload = false;
        $rootScope.$broadcast('$routeChangeStart', next, last);
        $route.current = next;
        if (next) {
          if (next.redirectTo) {
            if (isString(next.redirectTo)) {
              $location.path(interpolate(next.redirectTo, next.params)).search(next.params)
                       .replace();
            } else {
              $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search()))
                       .replace();
            }
          }
        }

        $q.when(next).
          then(function() {
            if (next) {
              var locals = extend({}, next.resolve),
                  template;

              forEach(locals, function(value, key) {
                locals[key] = isString(value) ? $injector.get(value) : $injector.invoke(value);
              });

              if (isDefined(template = next.template)) {
                if (isFunction(template)) {
                  template = template(next.params);
                }
              } else if (isDefined(template = next.templateUrl)) {
                if (isFunction(template)) {
                  template = template(next.params);
                }
                if (isDefined(template)) {
                  next.loadedTemplateUrl = template;
                  template = $http.get(template, {cache: $templateCache}).
                      then(function(response) { return response.data; });
                }
              }
              if (isDefined(template)) {
                locals['$template'] = template;
              }
              return $q.all(locals);
            }
          }).
          // after route change
          then(function(locals) {
            if (next == $route.current) {
              if (next) {
                next.locals = locals;
                copy(next.params, $routeParams);
              }
              $rootScope.$broadcast('$routeChangeSuccess', next, last);
            }
          }, function(error) {
            if (next == $route.current) {
              $rootScope.$broadcast('$routeChangeError', next, last, error);
            }
          });
      }
    }