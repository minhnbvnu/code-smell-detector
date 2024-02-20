function addLogging() {
		window.document.addEventListener('DOMContentLoaded', function() {
			var current_test_assertions = [];

			QUnit.log(function(details) {
				var response;

				// Ignore passing assertions
				if (details.result) {
					return;
				}

				response = details.message || '';

				if (typeof details.expected !== 'undefined') {
					if (response) {
						response += ', ';
					}

					response += 'expected: ' + details.expected + ', but was: ' + details.actual;
					if (details.source) {
						response += "\n" + details.source;
					}
				}

				current_test_assertions.push('Failed assertion: ' + response);
			});

			QUnit.testDone(function(result) {
				var i,
					len,
					name = result.module + ': ' + result.name;

				if (result.failed) {
					console.log('Test failed: ' + name);

					for (i = 0, len = current_test_assertions.length; i < len; i++) {
						console.log('    ' + current_test_assertions[i]);
					}
				}

				current_test_assertions.length = 0;
			});

			QUnit.done(function(result) {
				console.log('Took ' + result.runtime +  'ms to run ' + result.total + ' tests. ' + result.passed + ' passed, ' + result.failed + ' failed.');

				if (typeof window.callPhantom === 'function') {
					window.callPhantom({
						'name': 'QUnit.done',
						'data': result
					});
				}
			});
		}, false);
	}