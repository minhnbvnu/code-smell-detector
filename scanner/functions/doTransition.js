function doTransition(router, args) {
      // Normalize blank transitions to root URL transitions.
      var name = args[0] || '/';

      if (name.charAt(0) === '/') {
        return createURLTransition(router, name);
      } else {
        return createNamedTransition(router, args);
      }
    }