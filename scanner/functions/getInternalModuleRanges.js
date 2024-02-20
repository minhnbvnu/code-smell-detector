function getInternalModuleRanges() {
    /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges === 'function') {
      // Ask the DevTools hook for module ranges that may have been reported by the current renderer(s).
      // Don't do this eagerly like the laneToLabelMap,
      // because some modules might not yet have registered their boundaries when the renderer is injected.
      const ranges = __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges(); // This check would not be required,
      // except that it's possible for things to override __REACT_DEVTOOLS_GLOBAL_HOOK__.


      if (Object(shared_isArray["a" /* default */])(ranges)) {
        return ranges;
      }
    }

    return null;
  }