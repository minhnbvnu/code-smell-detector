function JsonpReceiver(url) {
	  debug(url);
	  var self = this;
	  EventEmitter.call(this);

	  utils.polluteGlobalNamespace();

	  this.id = 'a' + random.string(6);
	  var urlWithId = urlUtils.addQuery(url, 'c=' + encodeURIComponent(utils.WPrefix + '.' + this.id));

	  global[utils.WPrefix][this.id] = this._callback.bind(this);
	  this._createScript(urlWithId);

	  // Fallback mostly for Konqueror - stupid timer, 35 seconds shall be plenty.
	  this.timeoutId = setTimeout(function() {
	    debug('timeout');
	    self._abort(new Error('JSONP script loaded abnormally (timeout)'));
	  }, JsonpReceiver.timeout);
	}