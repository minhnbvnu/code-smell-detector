function sortAndStringify(obj) {
	return JSON.stringify(obj, function(k,v) {
		if (_.isObject(v) && !_.isArray(v) && !_.isFunction(v)) {
			return sortObject(v);
		}
		return v;
	});
}