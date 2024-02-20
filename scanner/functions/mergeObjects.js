function mergeObjects(provided, overrides, defaults)
{
	var rv, k;

	rv = {};
	if (defaults) {
		for (k in defaults)
			rv[k] = defaults[k];
	}

	if (provided) {
		for (k in provided)
			rv[k] = provided[k];
	}

	if (overrides) {
		for (k in overrides)
			rv[k] = overrides[k];
	}

	return (rv);
}