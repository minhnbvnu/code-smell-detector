function invokeDefaults() {
        // Ignore stopPropagation from defaults
        _evCfg._stopImmediatePropagation = undefined;
        _evCfg._stopPropagation = undefined;
        // We check here for whether we should invoke since may have changed since timeout (if late listener prevented default)
        if (!eventCopy.defaultPrevented || !_evCfg.cancelable) {
          // 2nd check should be redundant
          _evCfg.eventPhase = phases.AT_TARGET; // Temporarily set before we invoke default listeners
          eventCopy.target.invokeCurrentListeners(eventCopy.target._defaultListeners, eventCopy, type);
        }
        finishEventDispatch();
      }