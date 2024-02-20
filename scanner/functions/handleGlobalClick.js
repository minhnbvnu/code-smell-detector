function handleGlobalClick(e) {
      if (selected && // Typescript does not believe that these click events are always fired on DOM nodes.
      e.target instanceof Element && selected && // Not sure how, but it's possible for this to get called when handleNode is null/undefined.
      // https://sentry.io/share/issue/2066cd79f21e4f279791319f4d2ea35d/
      handleNode.current && !handleNode.current.contains(e.target)) {
        setSelected(false);
      }
    }