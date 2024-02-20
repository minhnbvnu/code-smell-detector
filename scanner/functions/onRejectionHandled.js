function onRejectionHandled(promise) {
		var index = arrayFindIndex(unhandledRejections, function (x) {
			return x.promise === promise;
		});

		unhandledRejections.splice(index, 1);
	}