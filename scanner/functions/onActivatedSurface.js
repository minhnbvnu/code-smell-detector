function onActivatedSurface(tuples, eventName, $event, range, nativeEvent) {
		var i;
		for (i = 0; i < tuples.length; i++) {
			if (tuples[i][0].isActive()) {
				tuples[i][1]($event, range, nativeEvent);
			}
		}
	}