function setupControllers($element, attrs, transcludeFn, controllerDirectives, isolateScope, scope, newIsolateScopeDirective) {
      var elementControllers = createMap();
      for (var controllerKey in controllerDirectives) {
        var directive = controllerDirectives[controllerKey];
        var locals = {
          $scope: directive === newIsolateScopeDirective || directive.$$isolateScope ? isolateScope : scope,
          $element: $element,
          $attrs: attrs,
          $transclude: transcludeFn
        };

        var controller = directive.controller;
        if (controller == '@') {
          controller = attrs[directive.name];
        }

        var controllerInstance = $controller(controller, locals, true, directive.controllerAs);

        // For directives with element transclusion the element is a comment.
        // In this case .data will not attach any data.
        // Instead, we save the controllers for the element in a local hash and attach to .data
        // later, once we have the actual element.
        elementControllers[directive.name] = controllerInstance;
        $element.data('$' + directive.name + 'Controller', controllerInstance.instance);
      }
      return elementControllers;
    }