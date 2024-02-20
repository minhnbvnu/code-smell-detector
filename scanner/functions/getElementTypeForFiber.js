function getElementTypeForFiber(fiber) {
    const {
      type,
      tag
    } = fiber;

    switch (tag) {
      case ClassComponent:
      case IncompleteClassComponent:
        return types["e" /* ElementTypeClass */];

      case FunctionComponent:
      case IndeterminateComponent:
        return types["h" /* ElementTypeFunction */];

      case ForwardRef:
        return types["g" /* ElementTypeForwardRef */];

      case HostRoot:
        return types["m" /* ElementTypeRoot */];

      case HostComponent:
      case HostResource:
      case HostSingleton:
        return types["i" /* ElementTypeHostComponent */];

      case HostPortal:
      case HostText:
      case Fragment:
        return types["k" /* ElementTypeOtherOrUnknown */];

      case MemoComponent:
      case SimpleMemoComponent:
        return types["j" /* ElementTypeMemo */];

      case SuspenseComponent:
        return types["n" /* ElementTypeSuspense */];

      case SuspenseListComponent:
        return types["o" /* ElementTypeSuspenseList */];

      case TracingMarkerComponent:
        return types["p" /* ElementTypeTracingMarker */];

      default:
        const typeSymbol = getTypeSymbol(type);

        switch (typeSymbol) {
          case ReactSymbols["a" /* CONCURRENT_MODE_NUMBER */]:
          case ReactSymbols["b" /* CONCURRENT_MODE_SYMBOL_STRING */]:
          case ReactSymbols["e" /* DEPRECATED_ASYNC_MODE_SYMBOL_STRING */]:
            return types["k" /* ElementTypeOtherOrUnknown */];

          case ReactSymbols["n" /* PROVIDER_NUMBER */]:
          case ReactSymbols["o" /* PROVIDER_SYMBOL_STRING */]:
            return types["f" /* ElementTypeContext */];

          case ReactSymbols["c" /* CONTEXT_NUMBER */]:
          case ReactSymbols["d" /* CONTEXT_SYMBOL_STRING */]:
            return types["f" /* ElementTypeContext */];

          case ReactSymbols["s" /* STRICT_MODE_NUMBER */]:
          case ReactSymbols["t" /* STRICT_MODE_SYMBOL_STRING */]:
            return types["k" /* ElementTypeOtherOrUnknown */];

          case ReactSymbols["l" /* PROFILER_NUMBER */]:
          case ReactSymbols["m" /* PROFILER_SYMBOL_STRING */]:
            return types["l" /* ElementTypeProfiler */];

          default:
            return types["k" /* ElementTypeOtherOrUnknown */];
        }

    }
  }