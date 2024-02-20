function factoryInjectionsFor(container, fullName) {
      var splitName = fullName.split(":"),
        type = splitName[0],
        factoryInjections = [];

      factoryInjections = factoryInjections.concat(container.factoryTypeInjections.get(type) || []);
      factoryInjections = factoryInjections.concat(container.factoryInjections[fullName] || []);

      factoryInjections = buildInjections(container, factoryInjections);
      factoryInjections._debugContainerKey = fullName;

      return factoryInjections;
    }