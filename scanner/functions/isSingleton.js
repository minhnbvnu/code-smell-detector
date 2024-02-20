function isSingleton(container, fullName) {
      var singleton = option(container, fullName, 'singleton');

      return singleton !== false;
    }