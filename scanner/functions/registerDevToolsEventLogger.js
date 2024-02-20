function registerDevToolsEventLogger(surface, fetchAdditionalContext) {
  async function logEvent(event) {
    if (DevToolsFeatureFlags_extension_oss["b" /* enableLogger */]) {
      if (loggingIFrame != null) {
        let metadata = null;

        if (event.metadata != null) {
          metadata = event.metadata; // $FlowFixMe: metadata is not writable and nullable

          delete event.metadata;
        }

        loggingIFrame.contentWindow.postMessage({
          source: 'react-devtools-logging',
          event: event,
          context: {
            surface,
            version: "4.27.1-f7d56173f",
            metadata: metadata !== null ? JSON.stringify(metadata) : '',
            ...(fetchAdditionalContext != null ? // $FlowFixMe
            await fetchAdditionalContext() : {})
          }
        }, '*');
      } else {
        missedEvents.push(event);
      }
    }
  }

  function handleLoggingIFrameLoaded(iframe) {
    if (loggingIFrame != null) {
      return;
    }

    loggingIFrame = iframe;

    if (missedEvents.length > 0) {
      missedEvents.forEach(event => logEvent(event));
      missedEvents = [];
    }
  } // If logger is enabled, register a logger that captures logged events
  // and render iframe where the logged events will be reported to


  if (DevToolsFeatureFlags_extension_oss["b" /* enableLogger */]) {
    const loggingUrl = "null";
    const body = document.body;

    if (typeof loggingUrl === 'string' && loggingUrl.length > 0 && body != null) {
      Object(Logger["b" /* registerEventLogger */])(logEvent);
      const iframe = document.createElement('iframe');
      iframe.src = loggingUrl;

      iframe.onload = function (...args) {
        handleLoggingIFrameLoaded(iframe);
      };

      body.appendChild(iframe);
    }
  }
}