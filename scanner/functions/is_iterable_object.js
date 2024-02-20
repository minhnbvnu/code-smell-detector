function is_iterable_object(x) {
		return typeof x === "object" && x !== null && !is_array(x) && !is_element(x);
	}