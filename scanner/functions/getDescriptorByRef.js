function getDescriptorByRef($ref, name, models, config) {
    var modelType = simpleRef($ref);
    var model = models[modelType] || {};
    var type = model.definition && model.definition.type ? model.definition.type : 'object';
    name = name || model.name;

    if (config.modelsToIgnore.indexOf($ref) > -1) {
      type = 'loop';
      config.loopTo = modelType;
    } else {
      config.modelsToIgnore.push($ref);
    }

    if (!model.definition) {
      return null;
    }

    return new Descriptor(name, type, model.definition, models, config);
  }