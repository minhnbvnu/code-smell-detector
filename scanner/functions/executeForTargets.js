function executeForTargets(fn) {
			var target = $(targetObject);
			fn(target);
			for (var i = 0, len = additionalTargetObjects.length; i < len ; i++) {
				fn($(additionalTargetObjects[i]));
			}
		}