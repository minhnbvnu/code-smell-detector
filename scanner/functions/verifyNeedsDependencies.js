function verifyNeedsDependencies(controller, container, needs) {
  var dependency, i, l;

  for (i=0, l=needs.length; i<l; i++) {
    dependency = needs[i];
    if (dependency.indexOf(':') === -1) {
      dependency = "controller:" + dependency;
    }

    // Structure assert to still do verification but not string concat in production
    if (!container.has(dependency)) {
      Ember.assert(Ember.inspect(controller) + " needs " + dependency + " but it does not exist", false);
    }
  }
}