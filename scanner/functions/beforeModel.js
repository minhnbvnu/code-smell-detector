function beforeModel() {

        log(router, seq, handlerName + ": calling beforeModel hook");

        var p = handler.beforeModel && handler.beforeModel(transition);
        return (p instanceof Transition) ? null : p;
      }