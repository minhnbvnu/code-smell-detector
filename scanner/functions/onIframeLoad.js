function onIframeLoad() {
			var module, test,
				count = 0;

			QUnit.extend( iframeWin.QUnit, {
				moduleStart: function( data ) {
					// capture module name for messages
					module = data.name;
				},

				testStart: function( data ) {
					// capture test name for messages
					test = data.name;
				},

				log: function( data ) {
					// pass all test details through to the main page
					var message = module + ": " + test + ": " + data.message;
					expect( ++count );
					QUnit.push( data.result, data.actual, data.expected, message );
				},

				done: function() {
					// start the wrapper test from the main page
					start();
				}
			});
		}