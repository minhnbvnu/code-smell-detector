function updateContextsForFiber(fiber) {
    switch (getElementTypeForFiber(fiber)) {
      case types["e" /* ElementTypeClass */]:
      case types["g" /* ElementTypeForwardRef */]:
      case types["h" /* ElementTypeFunction */]:
      case types["j" /* ElementTypeMemo */]:
        if (idToContextsMap !== null) {
          const id = getFiberIDThrows(fiber);
          const contexts = getContextsForFiber(fiber);

          if (contexts !== null) {
            // $FlowFixMe[incompatible-use] found when upgrading Flow
            idToContextsMap.set(id, contexts);
          }
        }

        break;

      default:
        break;
    }
  }