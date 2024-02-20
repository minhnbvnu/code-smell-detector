function getWeeklyServiceCacheBuster() {
		let d = new Date();
		// Weekly
		return `_${d.getFullYear()}${pad(d.getMonth()+1)}_${d.getDate() % 7}`;
	}