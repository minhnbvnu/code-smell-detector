function getDisplayNameForFiber(fiber) {
    const {
      elementType,
      type,
      tag
    } = fiber;
    let resolvedType = type;

    if (typeof type === 'object' && type !== null) {
      resolvedType = resolveFiberType(type);
    }

    let resolvedContext = null;

    switch (tag) {
      case CacheComponent:
        return 'Cache';

      case ClassComponent:
      case IncompleteClassComponent:
        return Object(utils["k" /* getDisplayName */])(resolvedType);

      case FunctionComponent:
      case IndeterminateComponent:
        return Object(utils["k" /* getDisplayName */])(resolvedType);

      case ForwardRef:
        return Object(utils["s" /* getWrappedDisplayName */])(elementType, resolvedType, 'ForwardRef', 'Anonymous');

      case HostRoot:
        const fiberRoot = fiber.stateNode;

        if (fiberRoot != null && fiberRoot._debugRootType !== null) {
          return fiberRoot._debugRootType;
        }

        return null;

      case HostComponent:
      case HostSingleton:
      case HostResource:
        return type;

      case HostPortal:
      case HostText:
        return null;

      case Fragment:
        return 'Fragment';

      case LazyComponent:
        // This display name will not be user visible.
        // Once a Lazy component loads its inner component, React replaces the tag and type.
        // This display name will only show up in console logs when DevTools DEBUG mode is on.
        return 'Lazy';

      case MemoComponent:
      case SimpleMemoComponent:
        // Display name in React does not use `Memo` as a wrapper but fallback name.
        return Object(utils["s" /* getWrappedDisplayName */])(elementType, resolvedType, 'Memo', 'Anonymous');

      case SuspenseComponent:
        return 'Suspense';

      case LegacyHiddenComponent:
        return 'LegacyHidden';

      case OffscreenComponent:
        return 'Offscreen';

      case ScopeComponent:
        return 'Scope';

      case SuspenseListComponent:
        return 'SuspenseList';

      case Profiler:
        return 'Profiler';

      case TracingMarkerComponent:
        return 'TracingMarker';

      default:
        const typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case ReactSymbols["a" /* CONCURRENT_MODE_NUMBER */]:
          case ReactSymbols["b" /* CONCURRENT_MODE_SYMBOL_STRING */]:
          case ReactSymbols["e" /* DEPRECATED_ASYNC_MODE_SYMBOL_STRING */]:
            return null;

          case ReactSymbols["n" /* PROVIDER_NUMBER */]:
          case ReactSymbols["o" /* PROVIDER_SYMBOL_STRING */]:
            // 16.3.0 exposed the context object as "context"
            // PR #12501 changed it to "_context" for 16.3.1+
            // NOTE Keep in sync with inspectElementRaw()
            resolvedContext = fiber.type._context || fiber.type.context;
            return `${resolvedContext.displayName || 'Context'}.Provider`;

          case ReactSymbols["c" /* CONTEXT_NUMBER */]:
          case ReactSymbols["d" /* CONTEXT_SYMBOL_STRING */]:
          case ReactSymbols["r" /* SERVER_CONTEXT_SYMBOL_STRING */]:
            // 16.3-16.5 read from "type" because the Consumer is the actual context object.
            // 16.6+ should read from "type._context" because Consumer can be different (in DEV).
            // NOTE Keep in sync with inspectElementRaw()
            resolvedContext = fiber.type._context || fiber.type; // NOTE: TraceUpdatesBackendManager depends on the name ending in '.Consumer'
            // If you change the name, figure out a more resilient way to detect it.

            return `${resolvedContext.displayName || 'Context'}.Consumer`;

          case ReactSymbols["s" /* STRICT_MODE_NUMBER */]:
          case ReactSymbols["t" /* STRICT_MODE_SYMBOL_STRING */]:
            return null;

          case ReactSymbols["l" /* PROFILER_NUMBER */]:
          case ReactSymbols["m" /* PROFILER_SYMBOL_STRING */]:
            return `Profiler(${fiber.memoizedProps.id})`;

          case ReactSymbols["p" /* SCOPE_NUMBER */]:
          case ReactSymbols["q" /* SCOPE_SYMBOL_STRING */]:
            return 'Scope';

          default:
            // Unknown element type.
            // This may mean a new element type that has not yet been added to DevTools.
            return null;
        }

    }
  }