function mixinBehaviors(behaviors, klass) {
      return GenerateClassFromInfo({}, Polymer.LegacyElementMixin(klass), behaviors);
    }