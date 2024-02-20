function resolveState(state, params, paramsAreFiltered, inherited, dst, options) {
      // Make a restricted $stateParams with only the parameters that apply to this state if
      // necessary. In addition to being available to the controller and onEnter/onExit callbacks,
      // we also need $stateParams to be available for any $injector calls we make during the
      // dependency resolution process.
      var $stateParams = (paramsAreFiltered) ? params : filterByKeys(state.params.$$keys(), params);
      var locals = { $stateParams: $stateParams };

      // Resolve 'global' dependencies for the state, i.e. those not specific to a view.
      // We're also including $stateParams in this; that way the parameters are restricted
      // to the set that should be visible to the state, and are independent of when we update
      // the global $state and $stateParams values.
      dst.resolve = $resolve.resolve(state.resolve, locals, dst.resolve, state);
      var promises = [dst.resolve.then(function (globals) {
        dst.globals = globals;
      })];
      if (inherited) promises.push(inherited);

      // Resolve template and dependencies for all views.
      forEach(state.views, function (view, name) {
        var injectables = (view.resolve && view.resolve !== state.resolve ? view.resolve : {});
        injectables.$template = [ function () {
          return $view.load(name, { view: view, locals: locals, params: $stateParams, notify: options.notify }) || '';
        }];

        promises.push($resolve.resolve(injectables, locals, dst.resolve, state).then(function (result) {
          // References to the controller (only instantiated at link time)
          if (isFunction(view.controllerProvider) || isArray(view.controllerProvider)) {
            var injectLocals = angular.extend({}, injectables, locals);
            result.$$controller = $injector.invoke(view.controllerProvider, null, injectLocals);
          } else {
            result.$$controller = view.controller;
          }
          // Provide access to the state itself for internal use
          result.$$state = state;
          result.$$controllerAs = view.controllerAs;
          dst[name] = result;
        }));
      });

      // Wait for all the promises and then return the activation object
      return $q.all(promises).then(function (values) {
        return dst;
      });
    }