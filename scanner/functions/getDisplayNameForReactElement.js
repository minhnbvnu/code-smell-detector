function getDisplayNameForReactElement(element) {
  const elementType = Object(react_is["typeOf"])(element);

  switch (elementType) {
    case react_is["ContextConsumer"]:
      return 'ContextConsumer';

    case react_is["ContextProvider"]:
      return 'ContextProvider';

    case react_is["ForwardRef"]:
      return 'ForwardRef';

    case react_is["Fragment"]:
      return 'Fragment';

    case react_is["Lazy"]:
      return 'Lazy';

    case react_is["Memo"]:
      return 'Memo';

    case react_is["Portal"]:
      return 'Portal';

    case react_is["Profiler"]:
      return 'Profiler';

    case react_is["StrictMode"]:
      return 'StrictMode';

    case react_is["Suspense"]:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

    case REACT_TRACING_MARKER_TYPE:
      return 'TracingMarker';

    default:
      const {
        type
      } = element;

      if (typeof type === 'string') {
        return type;
      } else if (typeof type === 'function') {
        return getDisplayName(type, 'Anonymous');
      } else if (type != null) {
        return 'NotImplementedInDevtools';
      } else {
        return 'Element';
      }

  }
}