function toBeTssFile(expected) {
	var actual = this.actual;
	var style;

	try {
		var die = U.die;
		U.die = function(msg, e) {
			U.die = die;
			throw U.createErrorOutput(msg, e);
		};
		style = styler.loadStyle(actual);
		U.die = die;
	} catch (e) {
		U.die = die || U.die;
		return false;
	}

	if (_.isObject(style)) {
		return true;
	}
	return false;
}