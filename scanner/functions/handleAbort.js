function handleAbort(result) {
        if (transition.isAborted) {
          log(transition.router, transition.sequence, "detected abort.");
          return RSVP.reject(new Router.TransitionAborted());
        }

        return result;
      }