function parseResponseTimeOpt(responseTime) {
		if ($.isArray(responseTime)) {
			var min = responseTime[0];
			var max = responseTime[1];
			return (typeof min === 'number' && typeof max === 'number') ? Math.floor(Math.random() * (max - min)) + min : null;
		} else {
			return (typeof responseTime === 'number') ? responseTime: null;
		}
	}