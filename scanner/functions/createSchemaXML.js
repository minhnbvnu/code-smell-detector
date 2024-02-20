function createSchemaXML (name, definition, models, config) {
    var $ref = _.isObject(definition) ? definition.$ref : null;
    var output, index;
    config = config || {};
    config.modelsToIgnore = config.modelsToIgnore || [];
    var descriptor = _.isString($ref) ? getDescriptorByRef($ref, name, models, config)
        : getDescriptor(name, definition, models, config);

    if (!descriptor) {
      return getErrorMessage();
    }

    switch (descriptor.type) {
      case 'array':
        output = createArrayXML(descriptor); break;
      case 'object':
        output = createObjectXML(descriptor); break;
      case 'loop':
        output = getInfiniteLoopMessage(descriptor.name, descriptor.config.loopTo); break;
      default:
        output = createPrimitiveXML(descriptor);
    }

    if ($ref && descriptor.type !== 'loop') {
      index = config.modelsToIgnore.indexOf($ref);
      if (index > -1) {
        config.modelsToIgnore.splice(index, 1);
      }
    }

    return output;
  }