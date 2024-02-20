function fillTuples(map, tuples) {
		var i = tuples.length,
			tuple;
		while (i--) {
			tuple = tuples[i];
			map[tuple[0]] = tuple[1];
		}
		return map;
	}