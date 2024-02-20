function handlerEnteredOrUpdated(transition, currentHandlerInfos, handlerInfo, enter) {
      var handler = handlerInfo.handler,
          context = handlerInfo.context;

      try {
        if (enter && handler.enter) { handler.enter(); }
        checkAbort(transition);

        setContext(handler, context);

        if (handler.setup) { handler.setup(context); }
        checkAbort(transition);
      } catch(e) {
        if (!(e instanceof Router.TransitionAborted)) {
          // Trigger the `error` event starting from this failed handler.
          trigger(transition.router, currentHandlerInfos.concat(handlerInfo), true, ['error', e, transition]);
        }

        // Propagate the error so that the transition promise will reject.
        throw e;
      }

      currentHandlerInfos.push(handlerInfo);
    }