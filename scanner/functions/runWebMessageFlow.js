function runWebMessageFlow(authorizeUrl, options, callback) {
  var handler = new IframeHandler({
    url: authorizeUrl,
    eventListenerType: 'message',
    callback: function(eventData) {
      callback(null, eventData);
    },
    timeout: options.timeout,
    eventValidator: {
      isValid: function(eventData) {
        return !!(
          eventData.event.data &&
          eventData.event.data.type === 'authorization_response' &&
          options.state === eventData.event.data.response.state
        );
      }
    },
    timeoutCallback: function() {
      callback({
        error: 'timeout',
        error_description: 'Timeout during executing web_message communication',
        state: options.state
      });
    }
  });
  handler.init();
}