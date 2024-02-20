function multihook(hooks, skipDuplicates) {
	return function () {
		let ret;
		for (let i = 0; i < hooks.length; i++) {
			let r = callMethod(this, hooks[i], arguments);

			if (skipDuplicates && r != null) {
				if (!ret) ret = {};
				for (let key in r)
					if (r.hasOwnProperty(key)) {
						ret[key] = r[key];
					}
			}
			else if (typeof r !== 'undefined') ret = r;
		}
		return ret;
	};
}