function shallowcopy(x) {
		if (is_iterable_object(x)) {
			if (is_array(x)) {
				return shallowcopy_array(x);
			} else if (typeof x === "object") {
				return shallowcopy_obj(x);
			}
		}
		return x;
	}