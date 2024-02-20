function runtimeCondition(osname, name) {
	var output, map;
	osname = osname || [];
	name = name || [];

	if (!osname && !name) {
		return 'true';
	} else if (_.isString(name)) {
		return "Ti.Platform.name === '" + name + "'";
	} else if (_.isString(osname)) {
		return "Ti.Platform.osname === '" + osname + "'";
	} else {
		if (_.isArray(name)) {
			map = _.map(name, function(n) { return "Ti.Platform.name === '" + n + "'"; });
		}
		if (_.isArray(osname) && (!map || osname.length < name.length)) {
			map = _.map(osname, function(n) { return "Ti.Platform.osname === '" + n + "'"; });
		}
		if (!map) { return 'true'; }
	}

	return map.join('||');
}