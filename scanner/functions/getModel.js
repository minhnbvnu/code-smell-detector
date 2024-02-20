function getModel(handlerInfo, transition, handlerParams, needsUpdate) {

      var handler = handlerInfo.handler,
          handlerName = handlerInfo.name;

      if (!needsUpdate && handler.hasOwnProperty('context')) {
        return handler.context;
      }

      if (transition.providedModels.hasOwnProperty(handlerName)) {
        var providedModel = transition.providedModels[handlerName];
        return typeof providedModel === 'function' ? providedModel() : providedModel;
      }

      return handler.model && handler.model(handlerParams || {}, transition);
    }