function addReference(schema, name, skipRef) {
      var modelName = name;
      var model;

      if (schema.$ref) {
        modelName = schema.title || simpleRef(schema.$ref);
        model = models[simpleRef(schema.$ref)];
      } else if (_.isUndefined(name)) {
        modelName = schema.title || 'Inline Model ' + (++inlineModels);
        model = {definition: schema};
      }

      if (skipRef !== true) {
        references[modelName] = _.isUndefined(model) ? {} : model.definition;
      }

      return modelName;
    }