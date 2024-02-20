function addProperties(properties, hash) {
  for (let prop in hash) {
    if (!hash.hasOwnProperty(prop)) {
      continue;
    }

    if (isInternalProperty(prop)) {
      continue;
    }

    // remove `fooBinding` type props
    if (prop.match(/Binding$/)) {
      continue;
    }

    // when mandatory setter is removed, an `undefined` value may be set
    const desc =
      getDescriptorFor(hash, prop) ||
      Object.getOwnPropertyDescriptor(hash, prop);
    if (!desc) continue;
    if (
      hash[prop] === undefined &&
      desc.value === undefined &&
      !desc.get &&
      !desc._getter
    ) {
      continue;
    }

    let options = { isMandatorySetter: isMandatorySetter(desc) };

    if (typeof hash[prop] === 'object' && hash[prop] !== null) {
      options.isService =
        !('type' in hash[prop]) && hash[prop].type === 'service';

      if (!options.isService) {
        if (hash[prop].constructor) {
          options.isService = hash[prop].constructor.isServiceFactory;
        }
      }

      if (!options.isService) {
        options.isService = desc.value instanceof Ember.Service;
      }
    }
    if (options.isService) {
      replaceProperty(properties, prop, inspectValue(hash, prop), options);
      continue;
    }

    if (isComputed(hash, prop)) {
      options.isComputed = true;
      options.dependentKeys = (desc._dependentKeys || []).map((key) =>
        key.toString()
      );

      if (typeof desc.get === 'function') {
        options.code = Function.prototype.toString.call(desc.get);
      }
      if (typeof desc._getter === 'function') {
        options.isCalculated = true;
        options.code = Function.prototype.toString.call(desc._getter);
      }
      if (!options.code) {
        options.code = '';
      }

      options.readOnly = desc._readOnly;
      options.auto = desc._auto;
      options.canTrack = options.code !== '';
    }

    if (desc.get) {
      options.isGetter = true;
      options.canTrack = true;
      if (!desc.set) {
        options.readOnly = true;
      }
    }
    if (desc.hasOwnProperty('value') || options.isMandatorySetter) {
      delete options.isGetter;
      delete options.isTracked;
      options.isProperty = true;
      options.canTrack = false;
    }
    replaceProperty(properties, prop, inspectValue(hash, prop), options);
  }

  return properties;
}