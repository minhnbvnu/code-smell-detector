function ownProperties(constructor) {
      if (!constructor.hasOwnProperty(JSCompiler_renameProperty('__ownProperties', constructor))) {
        let props = null;

        if (constructor.hasOwnProperty(JSCompiler_renameProperty('properties', constructor))) {
          const properties = constructor.properties;
          
          if (properties) {
            props = normalizeProperties(properties);
          }
        }

        constructor.__ownProperties = props;
      }
      return constructor.__ownProperties;
    }