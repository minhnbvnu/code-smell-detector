function addTypeInjection(rules, type, property, fullName) {
      var injections = rules.get(type);

      if (!injections) {
        injections = [];
        rules.set(type, injections);
      }

      injections.push({
        property: property,
        fullName: fullName
      });
    }