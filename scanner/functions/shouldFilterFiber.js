function shouldFilterFiber(fiber) {
    const {
      _debugSource,
      tag,
      type,
      key
    } = fiber;

    switch (tag) {
      case DehydratedSuspenseComponent:
        // TODO: ideally we would show dehydrated Suspense immediately.
        // However, it has some special behavior (like disconnecting
        // an alternate and turning into real Suspense) which breaks DevTools.
        // For now, ignore it, and only show it once it gets hydrated.
        // https://github.com/bvaughn/react-devtools-experimental/issues/197
        return true;

      case HostPortal:
      case HostText:
      case LegacyHiddenComponent:
      case OffscreenComponent:
        return true;

      case HostRoot:
        // It is never valid to filter the root element.
        return false;

      case Fragment:
        return key === null;

      default:
        const typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case ReactSymbols["a" /* CONCURRENT_MODE_NUMBER */]:
          case ReactSymbols["b" /* CONCURRENT_MODE_SYMBOL_STRING */]:
          case ReactSymbols["e" /* DEPRECATED_ASYNC_MODE_SYMBOL_STRING */]:
          case ReactSymbols["s" /* STRICT_MODE_NUMBER */]:
          case ReactSymbols["t" /* STRICT_MODE_SYMBOL_STRING */]:
            return true;

          default:
            break;
        }

    }

    const elementType = getElementTypeForFiber(fiber);

    if (hideElementsWithTypes.has(elementType)) {
      return true;
    }

    if (hideElementsWithDisplayNames.size > 0) {
      const displayName = getDisplayNameForFiber(fiber);

      if (displayName != null) {
        // eslint-disable-next-line no-for-of-loops/no-for-of-loops
        for (const displayNameRegExp of hideElementsWithDisplayNames) {
          if (displayNameRegExp.test(displayName)) {
            return true;
          }
        }
      }
    }

    if (_debugSource != null && hideElementsWithPaths.size > 0) {
      const {
        fileName
      } = _debugSource; // eslint-disable-next-line no-for-of-loops/no-for-of-loops

      for (const pathRegExp of hideElementsWithPaths) {
        if (pathRegExp.test(fileName)) {
          return true;
        }
      }
    }

    return false;
  }