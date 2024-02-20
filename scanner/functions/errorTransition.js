function errorTransition(router, reason) {
      return new Transition(router, RSVP.reject(reason));
    }