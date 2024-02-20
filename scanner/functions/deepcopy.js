function deepcopy(x, options) {
		if (!options)
			options = {};
		if (!options["history"])
			options["history"] = [];
		var result;
		if (typeof x === "string" || x === null || typeof x === "undefined") {
			return x;
		} else if (is_element(x) || x instanceof RegExp) {
			if (options["json"]) {
				return void 0;
			} else {
				return x;
			}
		} else if (typeof x === "function") {
			if (options["json"]) {
				return void 0;
			} else {
				return x;
			}
		} else if (typeof x === "object") {
			if (array_indexof(options["history"], x) >= 0)
				return;
			else
				options["history"].push(x);
			if (is_array(x)) {
				result = [];
				for (var i = 0; i < x.length; i++) {
					var item = x[i];
					result.push(deepcopy(item, options));
				}
			} else {
				result = {};
				for (var key in x) {
					try {
						result[key] = deepcopy(x[key], options);
					} catch (e) {
						if (options["json"])
							result[key] = void 0;
						else
							result[key] = x[key];
					}
				}
			}
			return result;
		} else {
			return x;
		}
	}