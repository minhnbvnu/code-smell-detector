function getLoveLevel(name) {
		var score = 0;
		for(var i = 0; i < name.length; i++) {
			score += name.charCodeAt(i);
		}
		score %= 20;
		score -= 10;
		return score;
	}