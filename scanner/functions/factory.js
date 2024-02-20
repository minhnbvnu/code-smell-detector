function factory($injector) {
      function makeInjectable(fn) {
        if (isFunction(fn) || isArray(fn)) {
          return function(tElement, tAttrs) {
            return $injector.invoke(fn, this, {$element: tElement, $attrs: tAttrs});
          };
        } else {
          return fn;
        }
      }

      var template = (!options.template && !options.templateUrl ? '' : options.template);
      return {
        controller: controller,
        controllerAs: identifierForController(options.controller) || options.controllerAs || '$ctrl',
        template: makeInjectable(template),
        templateUrl: makeInjectable(options.templateUrl),
        transclude: options.transclude,
        scope: {},
        bindToController: options.bindings || {},
        restrict: 'E',
        require: options.require
      };
    }