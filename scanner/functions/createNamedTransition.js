function createNamedTransition(router, args) {
      var handlers = router.recognizer.handlersFor(args[0]);

      log(router, "Attempting transition to " + args[0]);

      return performTransition(router, handlers, slice.call(args, 1), router.currentParams);
    }