function mod2(value, expected, message) {
		var actual = value % 2;
		QUnit.push(actual == expected, actual, expected, message);
	}