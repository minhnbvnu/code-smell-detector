function propertyDefaults(constructor) {
      if (!constructor.hasOwnProperty(
        JSCompiler_renameProperty('__propertyDefaults', constructor))) {
        constructor.__propertyDefaults = null;
        let props = constructor._properties;
        for (let p in props) {
          let info = props[p];
          if ('value' in info) {
            constructor.__propertyDefaults = constructor.__propertyDefaults || {};
            constructor.__propertyDefaults[p] = info;
          }
        }
      }
      return constructor.__propertyDefaults;
    }