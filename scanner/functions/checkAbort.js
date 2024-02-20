function checkAbort(transition) {
      if (transition.isAborted) {
        log(transition.router, transition.sequence, "detected abort.");
        throw new Router.TransitionAborted();
      }
    }