function getMatchPointObject(objects, handlerName, activeTransition, paramName, params) {

      if (objects.length && paramName) {

        var object = objects.pop();

        // If provided object is string or number, treat as param.
        if (isParam(object)) {
          params[paramName] = object.toString();
        } else {
          return object;
        }
      } else if (activeTransition) {
        // Use model from previous transition attempt, preferably the resolved one.
        return activeTransition.resolvedModels[handlerName] ||
               (paramName && activeTransition.providedModels[handlerName]);
      }
    }