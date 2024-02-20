function sortUnique(a, compFn) {
		var i;
		if (compFn) {
			a.sort(compFn);
			for (i = 1; i < a.length; i++) {
				if (0 === compFn(a[i], a[i - 1])) {
					a.splice(i--, 1);
				}
			}
		} else {
			a.sort();
			for (i = 1; i < a.length; i++) {
				// Use loosely typed comparsion if no compFn is given
				// to avoid sortUnique([6, "6", 6]) => [6, "6", 6]
				if (a[i] == a[i - 1]) {
					a.splice(i--, 1);
				}
			}
		}
		return a;
	}