function renderWidget($scope, $element, currentScope, model, content) {
      // display loading template
      $element.html(dashboard.loadingTemplate);

      // create new scope
      var templateScope = $scope.$new();

      // pass config object to scope
      if (!model.config) {
        model.config = {};
      }

      templateScope.config = model.config;

      // local injections
      var base = {
        $scope: templateScope,
        widget: model,
        config: model.config
      };

      // get resolve promises from content object
      var resolvers = {};
      resolvers.$tpl = widgetService.getTemplate(content);
      if (content.resolve) {
        angular.forEach(content.resolve, function(promise, key) {
          if (angular.isString(promise)) {
            resolvers[key] = $injector.get(promise);
          } else {
            resolvers[key] = $injector.invoke(promise, promise, base);
          }
        });
      }

      // resolve all resolvers
      $q.all(resolvers).then(function(locals) {
        angular.extend(locals, base);

        // pass resolve map to template scope as defined in resolveAs
        if (content.resolveAs){
          templateScope[content.resolveAs] = locals;
        }

        // compile & render template
        var template = locals.$tpl;
        $element.html(template);
        if (content.controller) {
          var templateCtrl = $controller(content.controller, locals);
          if (content.controllerAs) {
            templateScope[content.controllerAs] = templateCtrl;
          }
          $element.children().data('$ngControllerController', templateCtrl);
        }
        $compile($element.contents())(templateScope);
      }, function(reason) {
        // handle promise rejection
        var msg = 'Could not resolve all promises';
        if (reason) {
          msg += ': ' + reason;
        }
        renderError($element, msg);
      });

      // destroy old scope
      if (currentScope) {
        currentScope.$destroy();
      }

      return templateScope;
    }