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