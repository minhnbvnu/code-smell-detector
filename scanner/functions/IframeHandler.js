function IframeHandler(options) {
  this.url = options.url;
  this.callback = options.callback;
  this.timeout = options.timeout || 60 * 1000;
  this.timeoutCallback = options.timeoutCallback || null;
  this.eventListenerType = options.eventListenerType || 'message';
  this.iframe = null;
  this.timeoutHandle = null;
  this._destroyTimeout = null;
  this.transientMessageEventListener = null;
  this.proxyEventListener = null;
  // If no event identifier specified, set default
  this.eventValidator = options.eventValidator || {
    isValid: function() {
      return true;
    }
  };

  if (typeof this.callback !== 'function') {
    throw new Error('options.callback must be a function');
  }
}