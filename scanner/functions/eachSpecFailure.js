function eachSpecFailure(suiteResults, callback) {
		for (var i = 0; i < suiteResults.length; i++) {
			var suiteResult = suiteResults[i];
			for (var j = 0; j < suiteResult.failedSpecResults.length; j++) {
				var failedSpecResult = suiteResult.failedSpecResults[j];
				var stackTraces = [];
				var messages = [];
				for (var k = 0; k < failedSpecResult.items_.length; k++) {
					stackTraces.push(failedSpecResult.items_[k].trace.stack);
					messages.push(failedSpecResult.items_[k].message);
				}
				callback(suiteResult.description, failedSpecResult.description, stackTraces, messages);
			}
		}
	}