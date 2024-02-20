function getNoMatchScore(val) {
	let score = 0;
	const n = val[0];
	const o = val[1];

	if (nMatch.has(n)) {
		score += nMatch.get(n);
	}

	if (oMatch.has(o)) {
		score += oMatch.get(o);
	}

	return score;
}