function handleStopInspectingNative(didSelectNode) {
      if (didSelectNode && focusTargetRef.current !== null) {
        focusTargetRef.current.focus();
        Object(Logger["a" /* logEvent */])({
          event_name: 'select-element',
          metadata: {
            source: 'inspector'
          }
        });
      }
    }