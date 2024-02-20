function createURLTransition(router, url) {

      var results = router.recognizer.recognize(url),
          currentHandlerInfos = router.currentHandlerInfos;

      log(router, "Attempting URL transition to " + url);

      if (!results) {
        return errorTransition(router, new Router.UnrecognizedURLError(url));
      }

      return performTransition(router, results, [], {});
    }