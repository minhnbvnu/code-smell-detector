function factoryFor(container, fullName) {
      var name = container.normalize(fullName);
      var factory = container.resolve(name);
      var injectedFactory;
      var cache = container.factoryCache;
      var type = fullName.split(":")[0];

      if (!factory) { return; }

      if (cache.has(fullName)) {
        return cache.get(fullName);
      }

      if (typeof factory.extend !== 'function' || (!Ember.MODEL_FACTORY_INJECTIONS && type === 'model')) {
        // TODO: think about a 'safe' merge style extension
        // for now just fallback to create time injection
        return factory;
      } else {

        var injections        = injectionsFor(container, fullName);
        var factoryInjections = factoryInjectionsFor(container, fullName);

        factoryInjections._toString = container.makeToString(factory, fullName);

        injectedFactory = factory.extend(injections);
        injectedFactory.reopenClass(factoryInjections);

        cache.set(fullName, injectedFactory);

        return injectedFactory;
      }
    }