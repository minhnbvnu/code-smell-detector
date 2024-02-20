function buildInjections(container, injections) {
      var hash = {};

      if (!injections) { return hash; }

      var injection, lookup;

      for (var i=0, l=injections.length; i<l; i++) {
        injection = injections[i];
        lookup = container.lookup(injection.fullName);

        if (lookup) {
          hash[injection.property] = lookup;
        } else {
          throw new Error('Attempting to inject an unknown injection: `' + injection.fullName + '`');
        }
      }

      return hash;
    }