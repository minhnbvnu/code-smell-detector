function _xhrSend(mockHandler, requestSettings, origSettings) {

		// This is a substitute for < 1.4 which lacks $.proxy
		var process = (function(that) {
			return function() {
				return (function() {
					// The request has returned
					this.status     = mockHandler.status;
					this.statusText = mockHandler.statusText;
					this.readyState	= 1;

					var finishRequest = function () {
						this.readyState	= 4;

						var onReady;
						// Copy over our mock to our xhr object before passing control back to
						// jQuery's onreadystatechange callback
						if ( requestSettings.dataType == 'json' && ( typeof mockHandler.responseText == 'object' ) ) {
							this.responseText = JSON.stringify(mockHandler.responseText);
						} else if ( requestSettings.dataType == 'xml' ) {
							if ( typeof mockHandler.responseXML == 'string' ) {
								this.responseXML = parseXML(mockHandler.responseXML);
								//in jQuery 1.9.1+, responseXML is processed differently and relies on responseText
								this.responseText = mockHandler.responseXML;
							} else {
								this.responseXML = mockHandler.responseXML;
							}
						} else if (typeof mockHandler.responseText === 'object' && mockHandler.responseText !== null) {
							// since jQuery 1.9 responseText type has to match contentType
							mockHandler.contentType = 'application/json';
							this.responseText = JSON.stringify(mockHandler.responseText);
						} else {
							this.responseText = mockHandler.responseText;
						}
						if( typeof mockHandler.status == 'number' || typeof mockHandler.status == 'string' ) {
							this.status = mockHandler.status;
						}
						if( typeof mockHandler.statusText === "string") {
							this.statusText = mockHandler.statusText;
						}
						// jQuery 2.0 renamed onreadystatechange to onload
						onReady = this.onreadystatechange || this.onload;

						// jQuery < 1.4 doesn't have onreadystate change for xhr
						if ( $.isFunction( onReady ) ) {
							if( mockHandler.isTimeout) {
								this.status = -1;
							}
							onReady.call( this, mockHandler.isTimeout ? 'timeout' : undefined );
						} else if ( mockHandler.isTimeout ) {
							// Fix for 1.3.2 timeout to keep success from firing.
							this.status = -1;
						}
					};

					// We have an executable function, call it to give
					// the mock handler a chance to update it's data
					if ( $.isFunction(mockHandler.response) ) {
						// Wait for it to finish
						if ( mockHandler.response.length === 2 ) {
							mockHandler.response(origSettings, function () {
								finishRequest.call(that);
							});
							return;
						} else {
							mockHandler.response(origSettings);
						}
					}

					finishRequest.call(that);
				}).apply(that);
			};
		})(this);

		if ( mockHandler.proxy ) {
			// We're proxying this request and loading in an external file instead
			_ajax({
				global: false,
				url: mockHandler.proxy,
				type: mockHandler.proxyType,
				data: mockHandler.data,
				dataType: requestSettings.dataType === "script" ? "text/plain" : requestSettings.dataType,
				complete: function(xhr) {
					mockHandler.responseXML = xhr.responseXML;
					mockHandler.responseText = xhr.responseText;
                    // Don't override the handler status/statusText if it's specified by the config
                    if (isDefaultSetting(mockHandler, 'status')) {
					    mockHandler.status = xhr.status;
                    }
                    if (isDefaultSetting(mockHandler, 'statusText')) {
					    mockHandler.statusText = xhr.statusText;
                    }
					this.responseTimer = setTimeout(process, parseResponseTimeOpt(mockHandler.responseTime) || 0);
				}
			});
		} else {
			// type == 'POST' || 'GET' || 'DELETE'
			if ( requestSettings.async === false ) {
				// TODO: Blocking delay
				process();
			} else {
				this.responseTimer = setTimeout(process, parseResponseTimeOpt(mockHandler.responseTime) || 50);
			}
		}
	}