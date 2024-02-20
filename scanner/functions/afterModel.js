function afterModel(context) {

        log(router, seq, handlerName + ": calling afterModel hook");

        // Pass the context and resolved parent contexts to afterModel, but we don't
        // want to use the value returned from `afterModel` in any way, but rather
        // always resolve with the original `context` object.

        transition.resolvedModels[handlerInfo.name] = context;

        var p = handler.afterModel && handler.afterModel(context, transition);
        return (p instanceof Transition) ? null : p;
      }