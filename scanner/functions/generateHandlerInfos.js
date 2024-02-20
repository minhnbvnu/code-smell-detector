function generateHandlerInfos(router, recogHandlers) {
      var handlerInfos = [];
      for (var i = 0, len = recogHandlers.length; i < len; ++i) {
        var handlerObj = recogHandlers[i],
            isDynamic = handlerObj.isDynamic || (handlerObj.names && handlerObj.names.length);

        handlerInfos.push({
          isDynamic: !!isDynamic,
          name: handlerObj.handler,
          handler: router.getHandler(handlerObj.handler)
        });
      }
      return handlerInfos;
    }