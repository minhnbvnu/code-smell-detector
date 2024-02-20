function getYesMatchScore(val) {
	let score = 0;
	const y = val[0];
	const e = val[1];
	const s = val[2];

	if (yMatch.has(y)) {
		score += yMatch.get(y);
	}

	if (eMatch.has(e)) {
		score += eMatch.get(e);
	}

	if (sMatch.has(s)) {
		score += sMatch.get(s);
	}

	return score;
}