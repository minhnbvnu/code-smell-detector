function ownObservers(constructor) {
      if (!constructor.hasOwnProperty(
        JSCompiler_renameProperty('__ownObservers', constructor))) {
          constructor.__ownObservers =
          constructor.hasOwnProperty(JSCompiler_renameProperty('observers', constructor)) ?
          /** @type {PolymerElementConstructor} */ (constructor).observers : null;
      }
      return constructor.__ownObservers;
    }