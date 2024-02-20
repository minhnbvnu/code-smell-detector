function getContextChangedKeys(fiber) {
    if (idToContextsMap !== null) {
      const id = getFiberIDThrows(fiber); // $FlowFixMe[incompatible-use] found when upgrading Flow

      const prevContexts = idToContextsMap.has(id) ? // $FlowFixMe[incompatible-use] found when upgrading Flow
      idToContextsMap.get(id) : null;
      const nextContexts = getContextsForFiber(fiber);

      if (prevContexts == null || nextContexts == null) {
        return null;
      }

      const [prevLegacyContext, prevModernContext] = prevContexts;
      const [nextLegacyContext, nextModernContext] = nextContexts;

      switch (getElementTypeForFiber(fiber)) {
        case types["e" /* ElementTypeClass */]:
          if (prevContexts && nextContexts) {
            if (nextLegacyContext !== NO_CONTEXT) {
              return getChangedKeys(prevLegacyContext, nextLegacyContext);
            } else if (nextModernContext !== NO_CONTEXT) {
              return prevModernContext !== nextModernContext;
            }
          }

          break;

        case types["g" /* ElementTypeForwardRef */]:
        case types["h" /* ElementTypeFunction */]:
        case types["j" /* ElementTypeMemo */]:
          if (nextModernContext !== NO_CONTEXT) {
            let prevContext = prevModernContext;
            let nextContext = nextModernContext;

            while (prevContext && nextContext) {
              // Note this only works for versions of React that support this key (e.v. 18+)
              // For older versions, there's no good way to read the current context value after render has completed.
              // This is because React maintains a stack of context values during render,
              // but by the time DevTools is called, render has finished and the stack is empty.
              if (!shared_objectIs(prevContext.memoizedValue, nextContext.memoizedValue)) {
                return true;
              }

              prevContext = prevContext.next;
              nextContext = nextContext.next;
            }

            return false;
          }

          break;

        default:
          break;
      }
    }

    return null;
  }