function handleAjax( url, origSettings ) {
		var mockRequest, requestSettings, mockHandler, overrideCallback;

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			origSettings = url;
			url = undefined;
		} else {
			// work around to support 1.5 signature
			origSettings = origSettings || {};
			origSettings.url = url;
		}

		// Extend the original settings for the request
		requestSettings = $.extend(true, {}, $.ajaxSettings, origSettings);

		// Generic function to override callback methods for use with
		// callback options (onAfterSuccess, onAfterError, onAfterComplete)
		overrideCallback = function(action, mockHandler) {
			var origHandler = origSettings[action.toLowerCase()];
			return function() {
				if ( $.isFunction(origHandler) ) {
					origHandler.apply(this, [].slice.call(arguments));
				}
				mockHandler['onAfter' + action]();
			};
		};

		// Iterate over our mock handlers (in registration order) until we find
		// one that is willing to intercept the request
		for(var k = 0; k < mockHandlers.length; k++) {
			if ( !mockHandlers[k] ) {
				continue;
			}

			mockHandler = getMockForRequest( mockHandlers[k], requestSettings );
			if(!mockHandler) {
				// No valid mock found for this request
				continue;
			}

			mockedAjaxCalls.push(requestSettings);

			// If logging is enabled, log the mock to the console
			$.mockjaxSettings.log( mockHandler, requestSettings );


			if ( requestSettings.dataType && requestSettings.dataType.toUpperCase() === 'JSONP' ) {
				if ((mockRequest = processJsonpMock( requestSettings, mockHandler, origSettings ))) {
					// This mock will handle the JSONP request
					return mockRequest;
				}
			}


			// Removed to fix #54 - keep the mocking data object intact
			//mockHandler.data = requestSettings.data;

			mockHandler.cache = requestSettings.cache;
			mockHandler.timeout = requestSettings.timeout;
			mockHandler.global = requestSettings.global;

			// In the case of a timeout, we just need to ensure
			// an actual jQuery timeout (That is, our reponse won't)
			// return faster than the timeout setting.
			if ( mockHandler.isTimeout ) {
				if ( mockHandler.responseTime > 1 ) {
					origSettings.timeout = mockHandler.responseTime - 1;
				} else {
					mockHandler.responseTime = 2;
					origSettings.timeout = 1;
				}
				mockHandler.isTimeout = false;
			}

			// Set up onAfter[X] callback functions
			if ( $.isFunction( mockHandler.onAfterSuccess ) ) {
				origSettings.success = overrideCallback('Success', mockHandler);
			}
			if ( $.isFunction( mockHandler.onAfterError ) ) {
				origSettings.error = overrideCallback('Error', mockHandler);
			}
			if ( $.isFunction( mockHandler.onAfterComplete ) ) {
				origSettings.complete = overrideCallback('Complete', mockHandler);
			}

			copyUrlParameters(mockHandler, origSettings);

			(function(mockHandler, requestSettings, origSettings, origHandler) {

				mockRequest = _ajax.call($, $.extend(true, {}, origSettings, {
					// Mock the XHR object
					xhr: function() { return xhr( mockHandler, requestSettings, origSettings, origHandler ); }
				}));
			})(mockHandler, requestSettings, origSettings, mockHandlers[k]);

			return mockRequest;
		}

		// We don't have a mock request
		unmockedAjaxCalls.push(origSettings);
		if($.mockjaxSettings.throwUnmocked === true) {
			throw new Error('AJAX not mocked: ' + origSettings.url);
		}
		else { // trigger a normal request
			return _ajax.apply($, [origSettings]);
		}
	}