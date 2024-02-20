function combineCommonParents(parents) {
	var uniqueParents = {};

	for (var p = 0; p < parents.length; p++) {
		var parent = parents[p];
		if (!(parent in uniqueParents)) {
			uniqueParents[parent] = parent;
		}
	}
	for (var q = 0; q < parents.length; q++) {
		parents[q] = uniqueParents[parents[q]];
	}
}