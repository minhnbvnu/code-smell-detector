function getContextsForFiber(fiber) {
    let legacyContext = NO_CONTEXT;
    let modernContext = NO_CONTEXT;

    switch (getElementTypeForFiber(fiber)) {
      case types["e" /* ElementTypeClass */]:
        const instance = fiber.stateNode;

        if (instance != null) {
          if (instance.constructor && instance.constructor.contextType != null) {
            modernContext = instance.context;
          } else {
            legacyContext = instance.context;

            if (legacyContext && Object.keys(legacyContext).length === 0) {
              legacyContext = NO_CONTEXT;
            }
          }
        }

        return [legacyContext, modernContext];

      case types["g" /* ElementTypeForwardRef */]:
      case types["h" /* ElementTypeFunction */]:
      case types["j" /* ElementTypeMemo */]:
        const dependencies = fiber.dependencies;

        if (dependencies && dependencies.firstContext) {
          modernContext = dependencies.firstContext;
        }

        return [legacyContext, modernContext];

      default:
        return null;
    }
  }