function finalizeTransition(transition, handlerInfos) {

      var router = transition.router,
          seq = transition.sequence,
          handlerName = handlerInfos[handlerInfos.length - 1].name;

      // Collect params for URL.
      var objects = [], providedModels = transition.providedModelsArray.slice();
      for (var i = handlerInfos.length - 1; i>=0; --i) {
        var handlerInfo = handlerInfos[i];
        if (handlerInfo.isDynamic) {
          var providedModel = providedModels.pop();
          objects.unshift(isParam(providedModel) ? providedModel.toString() : handlerInfo.context);
        }
      }

      var params = paramsForHandler(router, handlerName, objects);

      router.currentParams = params;

      var urlMethod = transition.urlMethod;
      if (urlMethod) {
        var url = router.recognizer.generate(handlerName, params);

        if (urlMethod === 'replace') {
          router.replaceURL(url);
        } else {
          // Assume everything else is just a URL update for now.
          router.updateURL(url);
        }
      }

      setupContexts(transition, handlerInfos);
    }