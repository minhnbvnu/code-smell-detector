function addInjection(rules, factoryName, property, injectionName) {
      var injections = rules[factoryName] = rules[factoryName] || [];
      injections.push({ property: property, fullName: injectionName });
    }