function WebSocketTransport(transUrl, ignore, options) {
	  if (!WebSocketTransport.enabled()) {
	    throw new Error('Transport created when disabled');
	  }

	  EventEmitter.call(this);
	  debug('constructor', transUrl);

	  var self = this;
	  var url = urlUtils.addPath(transUrl, '/websocket');
	  if (url.slice(0, 5) === 'https') {
	    url = 'wss' + url.slice(5);
	  } else {
	    url = 'ws' + url.slice(4);
	  }
	  this.url = url;

	  this.ws = new WebsocketDriver(this.url, [], options);
	  this.ws.onmessage = function(e) {
	    debug('message event', e.data);
	    self.emit('message', e.data);
	  };
	  // Firefox has an interesting bug. If a websocket connection is
	  // created after onunload, it stays alive even when user
	  // navigates away from the page. In such situation let's lie -
	  // let's not open the ws connection at all. See:
	  // https://github.com/sockjs/sockjs-client/issues/28
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=696085
	  this.unloadRef = utils.unloadAdd(function() {
	    debug('unload');
	    self.ws.close();
	  });
	  this.ws.onclose = function(e) {
	    debug('close event', e.code, e.reason);
	    self.emit('close', e.code, e.reason);
	    self._cleanup();
	  };
	  this.ws.onerror = function(e) {
	    debug('error event', e);
	    self.emit('close', 1006, 'WebSocket connection broken');
	    self._cleanup();
	  };
	}