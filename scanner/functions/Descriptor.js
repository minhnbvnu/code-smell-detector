function Descriptor (name, type, definition, models, config) {
    if (arguments.length < 4) {
      throw new Error();
    }

    this.config = config || {};
    this.config.modelsToIgnore = this.config.modelsToIgnore || [];
    this.name = getName(name, definition.xml);
    this.definition = definition;
    this.models = models;
    this.type = type;
  }