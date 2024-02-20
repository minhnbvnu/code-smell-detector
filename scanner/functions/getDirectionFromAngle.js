function getDirectionFromAngle(agl) {
		var directions = {
			up: agl < -45 && agl > -135,
			down: agl >= 45 && agl < 135,
			left: agl >= 135 || agl <= -135,
			right: agl >= -45 && agl <= 45
		};
		for (var key in directions) {
			if (directions[key]) return key;
		}
		return null;
	}