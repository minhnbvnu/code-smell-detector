function paramsForHandler(router, handlerName, objects) {

      var handlers = router.recognizer.handlersFor(handlerName),
          params = {},
          matchPoint = getMatchPoint(router, handlers, objects).matchPoint,
          object, handlerObj, handler, names, i;

      for (i=0; i<handlers.length; i++) {
        handlerObj = handlers[i];
        handler = router.getHandler(handlerObj.handler);
        names = handlerObj.names;

        // If it's a dynamic segment
        if (names.length) {
          // If we have objects, use them
          if (i >= matchPoint) {
            object = objects.shift();
          // Otherwise use existing context
          } else {
            object = handler.context;
          }

          // Serialize to generate params
          merge(params, serialize(handler, object, names));
        }
      }
      return params;
    }