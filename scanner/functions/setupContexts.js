function setupContexts(transition, handlerInfos) {
      var router = transition.router,
          partition = partitionHandlers(router.currentHandlerInfos || [], handlerInfos);

      router.targetHandlerInfos = handlerInfos;

      eachHandler(partition.exited, function(handlerInfo) {
        var handler = handlerInfo.handler;
        delete handler.context;
        if (handler.exit) { handler.exit(); }
      });

      var currentHandlerInfos = partition.unchanged.slice();
      router.currentHandlerInfos = currentHandlerInfos;

      eachHandler(partition.updatedContext, function(handlerInfo) {
        handlerEnteredOrUpdated(transition, currentHandlerInfos, handlerInfo, false);
      });

      eachHandler(partition.entered, function(handlerInfo) {
        handlerEnteredOrUpdated(transition, currentHandlerInfos, handlerInfo, true);
      });
    }