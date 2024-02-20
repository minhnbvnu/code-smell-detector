function makeSortWithCaseSensitiveBy(attribute) {
	return function(a, b) {
		if (a[attribute] != undefined && b[attribute] != undefined) {
			a = a[attribute];
			b = b[attribute];
			if (a < b) return -1;
			if (a > b) return 1;
			return 0;
		}
	}
}