function handleLoggingIFrameLoaded(iframe) {
    if (loggingIFrame != null) {
      return;
    }

    loggingIFrame = iframe;

    if (missedEvents.length > 0) {
      missedEvents.forEach(event => logEvent(event));
      missedEvents = [];
    }
  }