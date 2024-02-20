function _getAngle180(p1, p2) {
		var agl = Math.atan((p2.y - p1.y) * -1 / (p2.x - p1.x)) * (180 / Math.PI);
		return (agl < 0 ? (agl + 180) : agl);
	}