function getDescriptor (name, definition, models, config){
    var type = definition.type || 'object';

    if (!definition) {
      return null;
    }

    return new Descriptor(name, type, definition, models, config);
  }