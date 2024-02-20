function getMatchPoint(router, handlers, objects, inputParams) {

      var matchPoint = handlers.length,
          providedModels = {}, i,
          currentHandlerInfos = router.currentHandlerInfos || [],
          params = {},
          oldParams = router.currentParams || {},
          activeTransition = router.activeTransition,
          handlerParams = {},
          obj;

      objects = slice.call(objects);
      merge(params, inputParams);

      for (i = handlers.length - 1; i >= 0; i--) {
        var handlerObj = handlers[i],
            handlerName = handlerObj.handler,
            oldHandlerInfo = currentHandlerInfos[i],
            hasChanged = false;

        // Check if handler names have changed.
        if (!oldHandlerInfo || oldHandlerInfo.name !== handlerObj.handler) { hasChanged = true; }

        if (handlerObj.isDynamic) {
          // URL transition.

          if (obj = getMatchPointObject(objects, handlerName, activeTransition, true, params)) {
            hasChanged = true;
            providedModels[handlerName] = obj;
          } else {
            handlerParams[handlerName] = {};
            for (var prop in handlerObj.params) {
              if (!handlerObj.params.hasOwnProperty(prop)) { continue; }
              var newParam = handlerObj.params[prop];
              if (oldParams[prop] !== newParam) { hasChanged = true; }
              handlerParams[handlerName][prop] = params[prop] = newParam;
            }
          }
        } else if (handlerObj.hasOwnProperty('names')) {
          // Named transition.

          if (objects.length) { hasChanged = true; }

          if (obj = getMatchPointObject(objects, handlerName, activeTransition, handlerObj.names[0], params)) {
            providedModels[handlerName] = obj;
          } else {
            var names = handlerObj.names;
            handlerParams[handlerName] = {};
            for (var j = 0, len = names.length; j < len; ++j) {
              var name = names[j];
              handlerParams[handlerName][name] = params[name] = params[name] || oldParams[name];
            }
          }
        }

        if (hasChanged) { matchPoint = i; }
      }

      if (objects.length > 0) {
        throw new Error("More context objects were passed than there are dynamic segments for the route: " + handlers[handlers.length - 1].handler);
      }

      return { matchPoint: matchPoint, providedModels: providedModels, params: params, handlerParams: handlerParams };
    }