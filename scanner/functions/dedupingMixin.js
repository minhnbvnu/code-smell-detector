function dedupingMixin(base) {
      let baseSet = /** @type {!MixinFunction} */(base).__mixinSet;
      if (baseSet && baseSet[mixinDedupeId]) {
        return base;
      }
      let map = mixinApplications;
      let extended = map.get(base);
      if (!extended) {
        extended = /** @type {!Function} */(mixin)(base);
        map.set(base, extended);
      }
      // copy inherited mixin set from the extended class, or the base class
      // NOTE: we avoid use of Set here because some browser (IE11)
      // cannot extend a base Set via the constructor.
      let mixinSet = Object.create(/** @type {!MixinFunction} */(extended).__mixinSet || baseSet || null);
      mixinSet[mixinDedupeId] = true;
      /** @type {!MixinFunction} */(extended).__mixinSet = mixinSet;
      return extended;
    }